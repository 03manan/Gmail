import axios from "axios";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { setEmails } from "../src/redux/appSlice";

const useGetAllEmails = () => {
    const dispatch = useDispatch();
    const {emails} = useSelector(store => store.app);
    useEffect(() => {
        const fetchEmails = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/v1/email/getAllEmails", {
                withCredentials: true
                })
                console.log(res.data.emails);
                dispatch(setEmails(res.data.emails));
            } catch (error) {
                console.log(error)
            }
        }
        fetchEmails();
    },[])
};
export default useGetAllEmails;