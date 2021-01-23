import {
    Box,
    Button,
    Divider,
    Grid,
    IconButton,
    makeStyles,
    Paper,
    Typography,
} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import CancelIcon from '@material-ui/icons/Cancel';
import {serverUrl} from "../common/ServerUrl";
import {Link, useHistory} from "react-router-dom";
import Rating from "@material-ui/lab/Rating";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";


const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        marginLeft: theme.spacing(20),
        marginRight: theme.spacing(20),
        alignItems: "center",
        flexDirection: "column",
        minHeight: 16,

    },
    paperinner: {
        padding: theme.spacing(2),
        margin: theme.spacing(2),
        alignItems: "center",
        flexDirection: "column",
        minHeight: 16,

    },
    box: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    iconbutton: {
        marginRight:"1rem",
        width: "auto",
        color:  "#0B3954",
        fontSize: "large",
        "&:hover": {
            backgroundColor: "white",
        },
    }
}));


export default function Orderlist(props) {
    const classes = useStyles();
    const token = localStorage.getItem('token')
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [stars, setStars] = React.useState(0);
    const [total, setTotal] = React.useState(0);

    useEffect(() => {
        let temp = 0;
        props.orders.purchases.map((e, index) => {
            temp += e.unit_price;
        });
        setTotal(temp.toFixed(2));
    }, []);

    let history = useHistory();
    console.log(props.orders.purchases);

    const snackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen1(false);
        setOpen2(false);
    };

    const HandleCancel = (order, event) => {
        fetch(serverUrl + 'api/orders/customer-cancel/', {
            method: 'POST',
            headers: {'Authorization': 'Token ' + token, 'Content-Type': 'application/json'},
            body: JSON.stringify({'order_id': parseInt(order.order_id) }),
        }).then(res => res.json())
            .then(json => {
                if(json.success){
                    alert("Your order has been cancelled")
                    window.location.reload()
                } else alert("Cancel failed")
            })
    };

    const rateVendor = (pid, stars) => {
        setStars(stars);
        fetch(serverUrl + 'api/orders/add-vendor-rating/', {
            method: 'POST',
            headers: {'Authorization': 'Token ' + token, 'Content-Type': 'application/json'},
            body: JSON.stringify({'purchase_id': pid , 'rating_score': stars}),
        }).then(res => res.json())
            .then(json => {
                if (json.success) {
                    setMessage(json.success);
                    setOpen1(true);
                } else  {
                    setMessage("Vendor rating failed.");
                    setOpen2(true);
                }
            })
    };


    const Cancelinfo=()=>{
        if(props.orders.purchases[0].status=='Vcancelled'){
            return <Paper style={{backgroundColor: 'white', color:'#7A0010', fontWeight:'bold'}} className={classes.paperinner}>
                ORDER CANCELLED BY VENDOR
            </Paper>
        }else if(props.orders.purchases[0].status=='Ccancelled'){
            return <Paper style={{backgroundColor: 'white', color:'#7A0010', fontWeight:'bold'}} className={classes.paperinner}>
                ORDER CANCELLED BY CUSTOMER
            </Paper>
        }
    };

    return (
        <Paper className={classes.paper}>
            <Grid>
                <Grid container>
                    <Paper style={{backgroundColor: '#0B3954', color:'white', fontWeight:'bold'}} className={classes.paperinner}>
                        Order {props.orders.order_id}
                    </Paper>
                    {!(props.orders.purchases[0].status=='Vcancelled'||props.orders.purchases[0].status=='Ccancelled')?
                        <IconButton style={{marginRight:"15rem", fontWeight:"bold"}}className={classes.iconbutton} onClick={(event) => HandleCancel(props.vendororders.id, event)}>
                        <CancelIcon style={{marginRight:"0.5rem"}}/> Cancel Order
                    </IconButton>:<React.Fragment>
                        {Cancelinfo()}
                    </React.Fragment>}

                </Grid>
                {props.orders.purchases.map((e, index) => {
                    return (
                        <Paper className={classes.paperinner}>
                            <Grid container spacing={4}>
                                <Grid justify="center" item container xs={2}>
                                    <Link to={{pathname: `/product/${e.product.id}`}} style={{textDecoration: "none", color: "black"}}>
                                    <img
                                        style={{maxHeight: 200, maxWidth: 200}}
                                        src={e.product.image_url}
                                        alt="product image"
                                    />
                                    </Link>
                                </Grid>
                                <Grid
                                    item
                                    style={{flexDirection: "column", position: "relative"}}
                                    container
                                    xs={6}
                                >
                                    <Typography gutterBottom variant="h5">
                                        {e.product.name}
                                    </Typography>
                                    <Divider variant="middle"/>
                                    <Box
                                        style={{
                                            position: "absolute",
                                            top: 100,
                                            bottom: 10,
                                            left: 30,
                                            right: 550,
                                            display: "flex",

                                        }}
                                    >
                                        <Typography
                                            gutterBottom
                                            variant="h6"
                                            style={{marginRight: 15, marginBottom: 40, color: "#229954"}}
                                        >
                                            &nbsp;$&nbsp;
                                            {(e.unit_price).toFixed(2)}
                                        </Typography>
                                        <Typography
                                            gutterBottom
                                            variant="h6"
                                            style={{marginRight: 5, marginBottom: 40}}
                                        >
                                            &nbsp;AMOUNT&nbsp;:&nbsp;{e.amount}
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid
                                    item
                                    container
                                    direction="column"
                                    alignItems="center"
                                    justify="center"
                                    xs={4}
                                >

                                    <Box style={{marginRight: '0.7rem'}}
                                         className={classes.box}>
                                        {<span>Order Status: </span>}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <Button
                                            size="small"
                                            disabled
                                            variant="outlined"
                                            style={{
                                                backgroundColor: "white",
                                                color:"black",
                                            }}
                                        >
                                            {JSON.parse(JSON.stringify(e.status))}
                                        </Button>
                                    </Box>
                                            {e.status === "Delivered" ? (
                                                <Paper variant="outlined" style={{borderColor:"#7A0010"}}className={classes.paperinner}>
                                                    <div style={{marginLeft:"0.5rem", marginRight:"0.5rem"}}>
                                                        <Typography  >Please give a rating to <Typography style={{fontWeight:'bold'}}> {e.product.vendor}</Typography></Typography>
                                                        <Rating
                                                            style={{marginTop:"0.5rem"}}
                                                            id="temp_rating"
                                                            name="temp_rating"
                                                            value={stars}
                                                            max={10}
                                                            onChange={(event, newValue) => {
                                                                rateVendor(e.id, newValue);
                                                            }}
                                                        />
                                                        <Snackbar open={open1} autoHideDuration={6000} onClose={snackbarClose}>
                                                            <Alert onClose={snackbarClose} severity="success">
                                                                {message}
                                                            </Alert>
                                                        </Snackbar>
                                                        <Snackbar open={open2} autoHideDuration={6000} onClose={snackbarClose}>
                                                            <Alert onClose={snackbarClose} severity="error">
                                                                {message}
                                                            </Alert>
                                                        </Snackbar>
                                                    </div>
                                                </Paper>
                                            ):null}
                                </Grid>
                            </Grid>
                        </Paper>
                    );
                })}

                <Grid container justify="flex-end" style={{marginRight:"5rem"}}>
                    <Paper style={{backgroundColor: 'white', color:'#0B3954', fontWeight:'bold', fontSize:20}} className={classes.paperinner}>
                        Total cost: ${total}
                    </Paper>
                </Grid>
            </Grid>
        </Paper>
    );
}
