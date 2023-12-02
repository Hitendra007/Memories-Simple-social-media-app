import React from "react";
import { useEffect } from "react";
import memories from './images/memories.png'
import {Container,AppBar,Typography,Grow,Grid} from '@material-ui/core'
import Posts from "./Components/Posts/Posts";
import Form from './Components/Form/Form'
import useStyles from './styles'
import { useDispatch } from "react-redux";
import {getPosts} from './actions/posts'
import { useState } from "react";
const App =()=>{
    const [currentId,setCurrentId]= useState(null)
    const classes = useStyles()
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getPosts());
    },[dispatch,currentId])
    return (
        <Container maxWidth="lg">
            <AppBar className={classes.appBar}position='static' color='inherit'>
                <Typography className="classes." variant="h2" align="center" >
                    Memories
                </Typography>
                <img className={classes.image} src={memories} alt="memories" height="60"></img>
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} >
                        <Grid item xs={12} sm={7}>
                           <Posts setCurrentId={setCurrentId}/>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form currentId={currentId} setCurrentId={setCurrentId}/>
                        </Grid>

                    </Grid>
                </Container>
            </Grow>
        </Container>
    );
}
export default App;