import {createStore} from "vuex";
import state from "@/vuex/state";
import mutations from "@/vuex/mutations";
import actions from "@/vuex/actions";
import modules from "@/vuex/modules";
import getters from "@/vuex/getters";

export default createStore({
    state,
    mutations,
    actions,
    modules,
    getters,
});
