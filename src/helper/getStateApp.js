import store from "../redux/store/index";

const getStateApp = () => store.getState().app;

export default getStateApp;
