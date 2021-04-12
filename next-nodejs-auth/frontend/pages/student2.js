import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import withAuth from '../components/withAuth'
import config from '../config/config'
import useSWR, { mutate } from 'swr'

const student = ({ token }) => {

    const [user, setUser] = useState({})
    

    useEffect(() => {
        student_use()
    }, [])

    const student_use = async () => {
        try {
            // console.log('token: ', token)
            const users = await axios.get(`${config.URL}/student2`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            // console.log('user: ', users.data)
            setUser(users.data)
        }
        catch (e) {
            console.log(e)
        }

    }
    const { data, error } = useSWR(URL, fetcher)
    if (!data) return <div>Loading...</div>
    console.log('Home', data);
    
    const printstudent = (student) => {
        console.log('student: ', student);
        if (student && student.length)
            return (student.map((student, index) =>

            (<li key={index}>

                

                {(student) ? student.fname : '-'} :
                {(student) ? student.surname : '-'} :
                {(student) ? student.major : '-'} :
                {(student) ? student.GPA : 0}

                
                <button onClick={() => getStudent(student.id)}>Get</button>
                <button onClick={() => updateStudent(student.id)}>Update</button>
                <button onClick={() => deleteStudent(student.id)}>Delete</button>

            </li>)

            ))
        else 
        {
            (<h2>No Student</h2>)
        }


    }
 
    return (
        <Layout>
            <Head>
                <title>student</title>
            </Head>
           
            <div className={styles.container}>
                <Navbar />
                <h1>student</h1>
              
                <h2>Add Student</h2>
                    Name : <input type="text" onChange={(e) => setFname(e.target.value)}></input>
                    SurName : <input type="text" onChange={(e) => setSurname(e.target.value)}></input>
                    Major : <input type="text" onChange={(e) => setMajor(e.target.value)}></input>
                    GPA : <input type="text" onChange={(e) => setGPA(e.target.value)}></input>
                <button onClick={() => addStudent(fname, surname, major, GPA)}>Add</button>
        
            </div>
            <ul>{printstudent(data.list)} </ul>
            <ul>
                name: {student.fname} :
                surname: {student.surname} :
                major: {student.major} :
                GPA: {student.GPA}
            </ul>
          
        </Layout>
    )
}

export default withAuth(student)

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}
