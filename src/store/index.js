import { createStore } from "vuex";
import { postModule } from "@/store/postModule";

export default createStore({
    modules: {
        post: postModule
    }
})



    // state: {        // это комментирование использовалось в файле PostPageWithStore в самом верху шаблона
    //     likes: 3
    // },
    // getters: {
    //     doubleLikes(state) {
    //         return state.likes * 2;
    //     }
    // },
    // mutations: {
    //     incrementLikes(state) {
    //         state.likes++;
    //     },
    //     decrementLikes(state) {
    //         state.likes--;
    //     }
    // },
    // actions: {

    // },