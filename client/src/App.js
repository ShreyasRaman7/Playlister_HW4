import './App.css';
import { React } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { AuthContextProvider } from './auth';
import { GlobalStoreContextProvider } from './store'
import {
    AppBanner,
    HomeWrapper,
    LoginScreen,
    RegisterScreen,
    Statusbar,
    WorkspaceScreen,
    SubAppBanner,
    SubAppBanner2,
    SearchAppBanner,
    AllListsScreen
} from './components'
/*
    This is our application's top-level component.
    
    @author McKilla Gorilla.
*/
/*
  This is the entry-point for our application. Notice that we
  inject our store into all the components in our application.
  
  @author McKilla Gorilla
*/
const App = () => {   
    // find where I am (/current path from url) if path=/home, then render, for example
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <GlobalStoreContextProvider>              
                <AppBanner />
                {true ? <SubAppBanner2 /> :<> </>}
                {/* <SubAppBanner2 /> */}
                
                    <Switch>
                        <Route path="/" exact component={HomeWrapper} />
                        <Route path="/allLists" exact component={AllListsScreen} />
                        <Route path="/login/" exact component={LoginScreen} />
                        <Route path="/register/" exact component={RegisterScreen} />
                        <Route path="/playlist/:id" exact component={WorkspaceScreen} />
                    </Switch>
                    <Statusbar />
                </GlobalStoreContextProvider>
            </AuthContextProvider>
        </BrowserRouter>
    )
}

export default App