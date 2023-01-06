package main

import (
	"embed"
	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
	"log"
	"net/http"
	"specific-chat/handlers"
)

var content embed.FS

func main() {
	hub := handlers.NewHub()
	go hub.Run()

	router := mux.NewRouter()
	router.HandleFunc("/ws/{username}", func(responseWriter http.ResponseWriter, request *http.Request) {
		var upgrader = websocket.Upgrader{
			ReadBufferSize:  1024,
			WriteBufferSize: 1024,
			CheckOrigin: func(r *http.Request) bool {
				return true
			},
		}
		//username := request.URL.Query().Get("username")
		//log.Println(username)
		// Reading username from request parameter
		username := mux.Vars(request)["username"]
		log.Println(username)
		// Upgrading the HTTP connection socket connection
		connection, err := upgrader.Upgrade(responseWriter, request, nil)
		if err != nil {
			log.Println(err)
			return
		}
		handlers.CreateNewSocketUser(hub, connection, username)
	})
	router.PathPrefix("/static").Handler(http.StripPrefix("/static", http.FileServer(http.Dir("ui/build/static"))))
	router.PathPrefix("/").HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "ui/build/index.html")
	})

	log.Println("Server will start at http://localhost:8000/")
	log.Fatal(http.ListenAndServe(":8000", router))
}
