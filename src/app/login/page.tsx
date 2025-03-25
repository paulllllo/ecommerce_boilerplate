'use client'

import { useWixClient } from "@/hooks/useWixClient"
import { LoginState } from "@wix/sdk"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Cookies } from "react-cookie"

const modes = {
    REGISTER: 'REGISTER MODE',
    LOGIN: 'LOGIN MODE',
    RESET_PASSWORD: 'RESET MODE',
    VERIFY_EMAIL: 'VERIFY MODE'
}

const Login = () => {
    const wixClient = useWixClient()
    const router = useRouter()
    const cookies = new Cookies()
    const isLoggedIn = wixClient.auth.loggedIn()

    if (isLoggedIn) {
        router.push('/')
    }

    // console.log('loggedIn', isLoggedIn)

    const [mode, setMode] = useState(modes.LOGIN)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailCode, setEmailCode] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')

    const formTitle = mode === modes.LOGIN
        ? 'Log in'
        : mode === modes.REGISTER
            ? 'Sign-up'
            : mode === modes.RESET_PASSWORD
                ? 'Reset your Password'
                : 'Verify your Email'

    const buttonTitle = mode === modes.LOGIN
        ? 'Login'
        : mode === modes.REGISTER
            ? 'Sign-up'
            : mode === modes.RESET_PASSWORD
                ? 'Reset'
                : 'Verify'

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')
        let response

        try {
            switch (mode) {
                case modes.LOGIN:
                    response = await wixClient.auth.login({
                        email,
                        password,
                    });
                    break;
                case modes.REGISTER:
                    response = await wixClient.auth.register({
                        email: email,
                        password: password,
                        profile: { nickname: username },
                    });
                    break;
                case modes.RESET_PASSWORD:
                    response = await wixClient.auth.sendPasswordResetEmail(
                        email,
                        window.location.href,
                    );
                    break;
                case modes.VERIFY_EMAIL:
                    response = await wixClient.auth.processVerification({
                        verificationCode: emailCode,
                    });
                    break;

                default:
                    break;
                }
                console.log('response', response)

            switch (response?.loginState) {
                case LoginState.SUCCESS:
                    setMessage("Logged In Successfully!!!")
                    const tokens = await wixClient.auth.getMemberTokensForDirectLogin(response.data.sessionToken!);
                    const currentDate = new Date()
                    currentDate.setHours(currentDate.getHours() + 2)

                    cookies.set("refreshToken", JSON.stringify(tokens.refreshToken), {
                        expires: currentDate,
                      });
                    wixClient.auth.setTokens(tokens);
                    router.push("/");

                    break;
                case LoginState.FAILURE:
                    if (response.errorCode === 'invalidEmail' || response.errorCode === 'invalidPassword') {
                        setError("Email or Password already exits")
                    } else if (response.errorCode === 'emailAlreadyExists') {
                        setError("Email already exists")
                    } else if (response.errorCode === 'resetPassword') {
                        setError("You should reset your password")
                    } else {
                        setError("something went wrong!")
                    }
                    break;
                case LoginState.EMAIL_VERIFICATION_REQUIRED:
                    setMode(modes.VERIFY_EMAIL)
                    break;
                case LoginState.OWNER_APPROVAL_REQUIRED:
                    setError("Your account is pending approval")
                    break;
                default:
                    break;
            }

            } catch (error: any) {
                console.error('error', error)
                setError(error?.message || 'Something went wrong')
            } finally {
                setIsLoading(false)
            }
        }

    return (
            <div className="h-[calc(100vh-5rem)] px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex items-center justify-center">
                <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                    <h1 className="text-2xl font-semibold">{formTitle}</h1>
                    {mode === modes.REGISTER ? (
                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-gray-700">Username</label>
                            <input
                                type="text"
                                name="username"
                                placeholder="josh"
                                className="ring-2 ring-gray-300 rounded-md p-4"
                                onChange={(e) => setUsername(e.target.value)} />
                        </div>
                    ) : null}
                    {mode !== modes.VERIFY_EMAIL ? (
                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-gray-700">Email</label>
                            <input
                                type="text"
                                name="email"
                                placeholder="josh@gmail.com"
                                className="ring-2 ring-gray-300 rounded-md p-4"
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-gray-700">Verification Code</label>
                            <input
                                type="text"
                                name="emailcode"
                                placeholder="Code"
                                className="ring-2 ring-gray-300 rounded-md p-4"
                                onChange={(e) => setEmailCode(e.target.value)} />
                        </div>
                    )}
                    {mode === modes.REGISTER || mode === modes.LOGIN ? (
                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-gray-700">Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                className="ring-2 ring-gray-300 rounded-md p-4"
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    ) : null}
                    {mode === modes.LOGIN && (
                        <span className="text-sm cursor-pointer underline" onClick={() => setMode(modes.RESET_PASSWORD)}>Forgot Password?</span>
                    )}
                    <button className="p-2 bg-pink-500 text-white rounded-md disabled:bg-pink-200 disabled:cursor-not-allowed">{isLoading ? 'Loading...' : buttonTitle}</button>
                    {error && <span className="text-red-600 p-2 bg-red-200 rounded-md">{error}</span>}
                    {mode === modes.LOGIN && (
                        <span
                            className="text-sm underline cursor-pointer"
                            onClick={() => setMode(modes.REGISTER)}
                        >
                            {"Don't"} have an account?
                        </span>
                    )}
                    {mode === modes.REGISTER && (
                        <span
                            className="text-sm underline cursor-pointer"
                            onClick={() => setMode(modes.LOGIN)}
                        >
                            Have an account?
                        </span>
                    )}
                    {mode === modes.RESET_PASSWORD && (
                        <span
                            className="text-sm underline cursor-pointer"
                            onClick={() => setMode(modes.LOGIN)}
                        >
                            Go back to Login
                        </span>
                    )}
                    {message && <span className="text-green-600 text-sm">{message}</span>}
                </form>
            </div>
        )
    }

    export default Login
