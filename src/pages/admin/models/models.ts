import { Effect, ImmerReducer, Redirect, Reducer, Subscription } from 'umi';
import { arr } from "../components/Menu";

export interface IndexModelState {
    title: string;
    auth: any;
}

export interface IndexModelType {
    namespace: 'admin';
    state: IndexModelState;
    effects: {
        // query: Effect;
    };
    reducers: {
        changeTitle: Reducer<IndexModelState>;
        // save: Reducer<IndexModelState>;
        // 启用 immer 之后
        // save: ImmerReducer<IndexModelState>;
    };
    subscriptions: { setup: Subscription };
}

const IndexModel: IndexModelType = {
    namespace: 'admin',

    state: {
        title: '',
        auth: "",
    },

    effects: {
        // *query({ payload }, { call, put }) { },
    },
    reducers: {
        // save(state, action) {
        //     return {
        //         ...state,
        //         ...action.payload,
        //     };
        // },
        // 启用 immer 之后
        // save(state, action) {
        //   state.name = action.payload;
        // },
        changeTitle(state, action) {

            return {
                ...state,
                title: action.title,
                auth: action.auth
            };
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname }) => {
                arr.forEach((item: any) => {
                    // console.log(item.title);
                    // console.log(item.key);


                    if ("/admin" + item.path === pathname) {

                        dispatch({ type: "changeTitle", title: item.title, auth: item.auth })
                    }
                    item.children && item.children.forEach((child: any) => {
                        if ("/admin" + child.path === pathname) {
                            dispatch({ type: "changeTitle", title: child.title, auth: child.auth })

                        }


                    })



                })


            });
        },
    },
};

export default IndexModel;