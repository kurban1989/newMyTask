import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase/app';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cards: []
  },

  mutations: {
    updateCards(state, cards) {
        state.cards = cards;
    },
    setCards(state, card) {
        state.cards.push(card);
    },
    completeCard(state, card) {
        state.cards.map(function(item, index) {
          if(item.id == card.id) {
            state.cards[index].success = card.success;
          }
        });
    },
    updateCard(state, card) {
        state.cards.map(function(item, index) {
          if(item.id == card.id) {
            state.cards[index].title = card.title;
          }
        });
    },
    removeCard(state, card) {
        state.cards = state.cards.filter(function(item) {
          if(item.id != card.id) return item;
        });
    },
    reverseCard(state, card) {
      state.cards = state.cards.reverse();
    }
  },

  actions: {
    addCard(context, card) {
        return new Promise(async function(resolve, reject) {
          const task = await firebase.database().ref('myTask').push(card)
          card.key = task.key;

          return resolve(context.commit('setCards', card));

      })
    },
    loadTask(context) {
      return new Promise(async function(resolve, reject) {
        const task = await firebase.database().ref('myTask').once('value')
        const cards = task.val();
        const cardsArray = [];

        if(cards !== null) {
          Object.keys(cards).forEach(key => {
            const t = cards[key];

            cardsArray.push({
                      id: t.id,
                      title: t.title,
                      success: t.success,
                      key: key
                    })
          });

          return resolve(context.commit('updateCards', cardsArray));
        }
      })
    },
    updateCards(context, cards) {
      context.commit('updateCards', cards)
    },
    async completeCard(context, card) {
      const infoCard = context.state.cards.filter(function(item, index) {
        if(item.id == card.id) {
          return context.state.cards[index].key;
        }
      });

      if(infoCard[0]) {
        await firebase.database().ref('myTask').child(infoCard[0].key).update(card).then(function() {
          context.commit('completeCard', card)
        }).catch(function(err) { throw new Error(err); });
      }
    },
    async updateCard(context, card) {
      const infoCard = context.state.cards.filter(function(item, index) {
        if(item.id == card.id) {
          return context.state.cards[index].key;
        }
      });

      if(infoCard[0]) {
        await firebase.database().ref('myTask').child(infoCard[0].key).update(card).then(function() {
          context.commit('updateCard', card)
        }).catch(function(err) { throw new Error(err); });
      }
    },
    removeCard(context, card) {
        const infoCard = context.state.cards.filter(function(item, index) {
          if(item.id == card.id) {
            return context.state.cards[index].key;
          }
        });

        if(infoCard[0]) {
          firebase.database().ref('myTask').child(infoCard[0].key).remove();
          context.commit('removeCard', card);
        }
    },
    reverseCard(context, card) {
        context.commit('reverseCard', card)
    }
  },

  getters: {
    allCards(state) {
        return state.cards;
    },
    pageCount(state){
      let len = state.cards.length;
      return Math.ceil(len/10);
    },
    getOnePage: (state) => (start, end) => {
      return [].slice.call(state.cards, start, end);
    },
    getOnePageRevers: (state) => (start, end) => {
        let rState = [].slice.call(state.cards, start, end);
        return rState.reverse();
    }
  }
});
