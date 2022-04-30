import Head from 'next/head'
import { app } from '../firebaseConfig'

import { useState, useEffect } from "react"
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth'
import { useRouter } from "next/router";

const register = () => {

    const auth = getAuth();
    const router = useRouter();
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            sessionStorage.setItem('Token', response.user.accessToken);
            router.push('/')
        })
    } 

    const SignUpWithGoogle = () => {
        signInWithPopup(auth, googleProvider)
        .then((response) => {
            sessionStorage.setItem('Token', response.user.accessToken);
            console.log(response.user)
            router.push('/')
        })
    }

    const SignUpWithGitHub = () => {
        signInWithPopup(auth, githubProvider)
        .then((response) => {
            sessionStorage.setItem('Token', response.user.accessToken);
            console.log(response.user)
            router.push('/')
        })
    }

    useEffect(() => {
        let token = sessionStorage.getItem('Token')

        if(token) {
            router.push('/')
        }
    }, [])
   
  return (
      <div>
        <div className='flexDiv'>
            <h1>Log In to your account</h1>
            <div className='borderDiv'>
                <div className='gridDiv'>
                    <label>Email address</label> 
                    <input placeholder='Email' onChange={(e) => setEmail(e.target.value)} type='email' />
                    <label>Password</label> 
                    <input placeholder='Password' onChange={(e) => setPassword(e.target.value)} type='password' />
                    <br />
                    <button onClick={signUp}>Sign Up</button>
                    <p>Or Sing Up with</p>
                    <div className='methods'>
                        {/* <span onClick={SignUpWithGoogle}><FcGoogle width={'30px'} height={'30px'} /></span>
                        <span onClick={SignUpWithGitHub}><FaGithub className='icon' /></span> */}
                        <span onClick={SignUpWithGoogle}><svg width="60px" height="60px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" class="icon">
                        <path d="M881 442.4H519.7v148.5h206.4c-8.9 48-35.9 88.6-76.6 115.8-34.4 23-78.3 36.6-129.9 36.6-99.9 0-184.4-67.5-214.6-158.2-7.6-23-12-47.6-12-72.9s4.4-49.9 12-72.9c30.3-90.6 114.8-158.1 214.7-158.1 56.3 0 106.8 19.4 146.6 57.4l110-110.1c-66.5-62-153.2-100-256.6-100-149.9 0-279.6 86-342.7 211.4-26 51.8-40.8 110.4-40.8 172.4S151 632.8 177 684.6C240.1 810 369.8 896 519.7 896c103.6 0 190.4-34.4 253.8-93 72.5-66.8 114.4-165.2 114.4-282.1 0-27.2-2.4-53.3-6.9-78.5z"/>
                        </svg></span>
                        <span onClick={SignUpWithGitHub}><svg width="60px" height="60px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" class="icon">
                        <path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9a127.5 127.5 0 0 1 38.1 91v112.5c.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z"/>
                        </svg></span>
                        

                    </div>
                </div>
            </div>
        </div>
        <style jsx>{`
            .borderDiv {
                width: fit-content;
                border-radius: 20px;
                box-shadow: rgba(0, 0, 0, 0.5) 0px 1px 2px 0px;
            }

            .gridDiv {
                display: grid;
                justify-content: center;
                align-content: center;
                padding: 20px;
            }

            .flexDiv {
                display: flex;
                justify-content: center;
                flex-direction: column;
                align-content: center;
                width: fit-content;
                margin: 0 auto;
                margin-top: 70px;
            }

            input {
                width: 300px;
                border: 1px solid gray;
                border-radius: 5px;
                padding: 10px;
            }

            button {
                width: 300px;
                padding: 9px;
                border-radius: 5px;
            }

            p {
                padding: 10px;
                text-align: center;
            }

            .methods {
                display: flex;
                justify-content: center;
            }

            span {
                cursor: pointer;
            }
        `}</style>
      </div>
  )
} 

export default register

{/* <Head>
        <title>To do App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}