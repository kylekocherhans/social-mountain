import { useState, useEffect, useCallback, createContext } from 'react'

let logoutTimer

const AuthContext = createContext({
  token: '',
  login: () => {},
  logout: () => {},
  userId: null
})

const calculateRemainingTime = (exp) => {
  const currentTime = new Date().getTime()
  const expTime = exp 
  const remainingTime = expTime - currentTime
  return remainingTime
}

const getLocalData = () => {
  const storedToken = localStorage.getItem('token')
  const storedUserId = localStorage.getItem('userId')
  const storedExp = localStorage.getItem('exp')

  const remainingTime = calculateRemainingTime(storedExp)

  if (remainingTime <= 1000 * 60 * 30) {
    localStorage.removeItem('token')
    localStorage.removeItem('exp')
    return null
  }


  return {
    token: storedToken,
    userId: +storedUserId,
    duration: remainingTime
  }
}



export const AuthContextProvider = (props) => {
  const localData = getLocalData()
  
  let initialToken
  let initialId
  if (localData) {
    initialToken = localData.token
    initialId = localData.userId
  }

  const [token, setToken] = useState(initialToken)
  const [userId, setUserId] = useState(initialId)


  const logout = () => {
    setToken(null);
    setUserId(null);

    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('exp');

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }

  const login = (token, exp, userId) => {
    setToken(token);
    setUserId(userId);

    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('exp', exp);

    const remainingTime = calculateRemainingTime(exp);

    logoutTimer = setTimeout(logout, remainingTime);
  }

  const contextValue = {
    token,
    userId,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext
