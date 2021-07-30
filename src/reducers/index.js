import { combineReducers } from 'redux';
import Login from "./Login";
import DrawerMenuReducer from "./DrawerMenuReducer";
import CheckOfflineReducer from './CheckOfflineReducer';
import SideScreenReducer from './SideScreenReducer';
import ForgetPassReducer from './ForgetPassReducer';
import CreateEventReducer from './CreateEventReducer';
import ResetPassReducer from './ResetPassReducer'
import UpdateProReducer from './UpdateProReducer';
import SignUp from './SignUp';
import UploadImageReducer from './UploadImageReducer';
import ViewManagerReducer from './ViewManagerReducer';
import RockingEventReducer from './RockingEventReducer'
import AllEventsReducer from './AllEventsReducer';
import CategoryListReducer from './CategoryListReducer';
import SubCategoryListReducer from './SubCategoryListReducer';
import UpcomingEvents from './UpcomingEvents';
import PastEventsRed from './PastEventsRed';
import SponsorsListRed from './SponsorsListRed';
import DeleteProfile from './DeleteProfile';
import DeleteEvent from './DeleteEvent';
import ViewEventDetails from './ViewEventDetails'
import UpdateEventRed from './UpdateEventRed'

export default combineReducers({
    login: Login,
    checkOfflineFeature: CheckOfflineReducer,
    drawermenu: DrawerMenuReducer,
    forgetpaswword: ForgetPassReducer,
    resetpass: ResetPassReducer,
    sidescreen: SideScreenReducer,
    createevent: CreateEventReducer,
    updatemanager: UpdateProReducer,
    SignUp: SignUp,
    UploadImage: UploadImageReducer,
    ViewManager: ViewManagerReducer,
    rockingevent: RockingEventReducer,
    allevents:AllEventsReducer,
    upcomingevents:UpcomingEvents,
    pastevents:PastEventsRed,
    categorylist:CategoryListReducer,
    subcategorylist:SubCategoryListReducer,
    sponsorslist:SponsorsListRed,
    deleteprofile:DeleteProfile,
    deleteevent:DeleteEvent,
    viewevent: ViewEventDetails,
    updateevent: UpdateEventRed,

})