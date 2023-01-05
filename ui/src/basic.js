

import {Paper,Tab,Tabs} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import { useState, useEffect ,useRef} from "react";
import {useLocation} from "react-router-dom";
import {Card} from "react-bootstrap";
const messenger = [{}]

function FindArrayElementByTitle(array, name) {

    const object = array.find(obj => obj.name === name);

    if (typeof(object) == 'undefined') {
        console.log("error")
    }else {
       if (object.msns.length > 20) {
           console.log(object.msns.length)
           object.msns.shift();
           console.log("array exceed")
       }
       return object.msns.map((mess) => <ul>{mess.includes("you: ") ? <text style={{color:"green",textAlign:"left"}}><Card style={{backgroundColor:"white",height:50,borderRadius:50,display:"table"}} body > {mess} </Card></text>:<text style={{alignSelf:"flex-end"}}><Card style={{backgroundColor:"white",height:50,borderRadius:50,marginTop:10,display:"table"}} body > {mess} </Card></text>}</ul>);
    }
}

function Basic() {

    const location = useLocation();
    const client = useRef(null);

    const [messages,SetMessages] = useState('')
    const [statev, setState] = useState({chatUsers: [], message: null, userID: null,connected:false,username:null,name:null});
    const [Id,SetId]  = useState( null)
    const [connected,setConnected] = useState(false)
    let  chatuser = location.state.name
    const[us,setUs] = useState(null)
    const url = "ws://localhost:8000/ws/" + chatuser
    const  bottomRef = useRef(null);
    useEffect(() => {
        bottomRef.current?.scrollIntoView({behavior:"smooth"})
    })

    useEffect(() => {
        client.current = new WebSocket(
            url
        )
        client.current.onopen = () => {
            console.log("Connection Established!");
        };
        client.current.onmessage = (event) => {
            console.log(client.current.onmessage)
            try {
                const response = JSON.parse(event.data);
                switch (response.eventName) {
                    case 'join':
                    case 'disconnect':
                        if (!response.eventPayload) {
                            return
                        }
                        const userInitPayload = response.eventPayload;
                        setState({
                            chatUsers: userInitPayload.users,
                            userID: statev.userID === null ? userInitPayload.userID : statev.userID
                        });

                        break;
                    case 'message response':

                        if (!response.eventPayload) {
                            return
                        }


                        const messageContent = response.eventPayload;

                        const actualMessage = messageContent.message;

                        setState({
                            message: `${actualMessage}`,
                            chatUsers: messageContent.clients,
                            username: messageContent.username,
                            userID: messageContent.userID,
                            name : messageContent.name
                        });
                      messenger.some(name => name.name)
                            const objIndex = messenger.findIndex((obj => obj.name === messageContent.name));
                            const isElementPresent = messenger.some((o) => o.name === messageContent.name);
                        if (!isElementPresent) {
                            messenger.push({msns: [actualMessage], name: messageContent.name})
                        }
                           else {
                                messenger[objIndex].msns.push(actualMessage)

                            }



                        break;


                    default:
                        break;
                }
            } catch (error) {
                console.log(error)
                console.warn('Something went wrong while decoding the Message Payload')
            }

        }



        client.current.onclose = () => {
            console.log("Connection Closed Simply!");
        };

        client.current.onerror = () => {
            console.log("WS Error");
        };
        return () => {
            client.current.close();
        }
    },[] );


    const handleMessage = (e) => {
        e.preventDefault();
      //  console.log(ws)
        SetMessages('')
        console.log(statev.userID)
        try {
           // {console.log(ws.current.readyState)}
            client.current.send(JSON.stringify({
                EventName: 'message',
                EventPayload: {
                    userID:Id,
                    message: messages,
                    name: chatuser
                },

            }))
            messenger.some(name => name.name)
            const objIndex = messenger.findIndex((obj => obj.name === us));
            const isElementPresent = messenger.some((o) => o.name === us);
            if (!isElementPresent) {                  // As some return Boolean value
                messenger.push({msns: ["you: "+messages], name: us})
            }
            else {
                messenger[objIndex].msns.push("you: "+messages)

            }

        }catch (error) {
            console.log(error)
            console.warn('Something went wrong while decoding the Message Payload')
        }


    }

    return (
        <div>

        { connected ? (
            <div style={{backgroundColor:"wheat"}}>
            <form onSubmit={handleMessage} className="text-center pt-3">

                <div className="col-sm-12">


                    <div className="card-header" style={{backgroundColor:"darkcyan",position:"sticky",borderRadius:80,textAlign:"center",color:"whitesmoke",fontFamily:"serif",fontSize:25}}>
                       <strong>{us.toUpperCase()}</strong>
                    </div>


                            <div class="card"  className="col-xl-12" style={{height:"85vh",overflow:"auto"}} >


                                <div className="col-md-6">

                                {FindArrayElementByTitle(messenger,us)}
                                <div ref={bottomRef}></div>
                                </div>


                            </div>


                </div>
                <div class="input-group">

                        <input
                            maxLength="74"
                            value={messages}
                            onChange={(e) => SetMessages(e.target.value)}
                            type="text"
                            placeholder="Type your message"
                            className="form-control"
                        />
                       <span class="input-group-btn">
                        <button  className="btn btn-secondary" type="submit">
                            Send
                        </button>
                        <button onClick={() => {setConnected(false)} }className="btn btn-secondary" type="submit">
                            close
                        </button>
                    </span>

                </div>
            </form>
            </div>

        ) : (
                <div
                    style={{
                        marginLeft: "10%",
                    }}
                >
                    <h2 style={{
                        marginBottom: "50px",
                        fontWeight: "bold",
                        fontFamily: "monospace",
                        textAlign: "center"
                    }}>
                        Welcome to the world of cupids
                    </h2>

                    <ul style={{listStyle: "none"}}>
                        <li>{statev.chatUsers.map(user => {
                            {
                                return (
                                    <Paper
                                        square
                                        style={{
                                            flexGrow: 1,
                                            maxWidth: 500,
                                            justifyContent: "left",
                                        }}
                                    >
                                        <Tabs
                                            variant="fullWidth"
                                            indicatorColor="primary"
                                            textColor="primary"
                                            aria-label="icon tabs example"
                                        >

                                            <Tab style={{color: "red"}} icon={<PersonIcon/>} onClick={() => {setConnected(true);SetId(user.userID);setUs(user.username)}}
                                                 aria-label="person" label={user.username}/>

                                        </Tabs>
                                        <ul>
                                            <li style={{color: "green", fontWeight: "bold"}}>online</li>
                                        </ul>
                                    </Paper>
                                )
                            }
                        })}</li>
                    </ul>

                </div>
            )
        }
        </div>
    );
}


export default Basic;