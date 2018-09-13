import Vue from 'vue';
import {
  resolve
} from 'path';

export const keep = ({
  commit,
  dispatch,
  state
}, itemData) => {
  return new Promise((resolve, reject) => {
    var cacheKeyFinished = 'KeyCacheFinished+' + itemData.InventoryNo
    var finishedData = localStorage.getItem(cacheKeyFinished)
    if (finishedData) {
      state.allCheckedData = JSON.parse(localStorage.getItem(cacheKeyFinished))
    }
    console.log('refreshFinishedData');
    console.log(state.finishedData);
  })
}
