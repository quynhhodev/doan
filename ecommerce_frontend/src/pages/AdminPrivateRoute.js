
import React, { useEffect, useState } from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';
import MasterLayout from '../layouts/admin/MasterLayout';



export const AdminPrivateRoute = ({
    component: Component,
    ...rest

}) => {
    const [Authenticated, setAuthenticated] = useState(false)
    const [loading, setloading] = useState(true)
    const history = useHistory()

    useEffect(() => {
        axios.get(`api/checkingAuthenticated`).then(res => {
            if (res.status === 200) {
                setAuthenticated(true)
            }
            setloading(false)
        })
        return () => {
            setAuthenticated(false)
        }

    }, [])
    axios.interceptors.response.use(undefined, function axiosRetry(err) {
        if (err.response.status === 401) {
            Swal.fire({
                icon: 'error',
                text: err.response.data.message,
            })
            history.push('/')
            //toast.success('UnAuthenticated');
        }
        return Promise.reject(err)
    })
    axios.interceptors.response.use(function (response) {
        return response;
    }, function (err) {
        if (err.response.status === 403) {
            Swal.fire({
                title: 'Lỗi!',
                text: err.response.data.message,
                icon: 'warning'
            })
            history.push('/')
        }
        else if (err.response.status === 404) {
            Swal.fire({
                title: '404 Error',
                text: 'Page/Url not found',
                icon: 'error'
            })
            history.push('/Page404')
        }
        return Promise.reject(err)
    })
    if (loading) {
        return <h1>Loading...</h1>
    }
    return (
        <Route
            {...rest}
            render={props => {
                if (Authenticated) {
                    return <MasterLayout {...props} />;
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: "/admin/login",
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                    );
                }
            }}
        />
    );
};