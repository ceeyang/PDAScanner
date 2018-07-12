import Vue from 'vue';

export const refreshFinishedData = () => {
    return new Promise(() => {
        state.neeFreshFinishedData = true
    })
}
