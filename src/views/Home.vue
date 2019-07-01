<template>
  <div class="Container">
    <div class="Container--center">
        <div class="list">
            <div class="list__header">
                <h1 class="list__header--name">
                    Задачи
                </h1>
                <div class="list__btn-revers" title="sort" @click="reverseCard($event)" ref="sortBtn"></div>
            </div>
            <div class="list__cards">
                <div class="list__add-cart" @click.prevent="addCard(true)" :class="{hide: isActiveBtnAddCard}">
                    <svg class="icon-plus" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"><path d="M.31,6.51C.14,6.51,0,6.29,0,6s.14-.49.31-.49l11.37,0c.18,0,.32.23.32.5s-.14.5-.32.5h0Z" transform="translate(0 0)"></path><path d="M5.49.32C5.49.14,5.71,0,6,0H6c.28,0,.5.14.5.31l0,11.38c0,.17-.22.31-.5.31s-.5-.14-.5-.32h0Z" transform="translate(0 0)"></path></svg>
                    <span>Добавить карточку</span>
                </div>

                <div class="card-composer" :class="{hide: isActiveAddCard}">
                    <div class="list__card">
                        <div class="list__card--details">
                            <textarea class="list__card--add" name="titleForNewCard" placeholder="Enter a title for this card..." v-model="textCard"></textarea>
                        </div>
                    </div>
                    <div class="controls clearfix">
                        <div class="controls__section">
                            <input class="primary primary__compact" type="submit" value="Добавить карточку" ref="btnAdd" @click="addCardInsert">
                            <div class="icon-lg" @click.prevent="addCard(false)" title="cancel"></div>
                        </div>
                    </div>
                </div>

                <div v-for="(item, index) in pageCards" :key="item.id">
                    <div class="list__card"  :class="item.success == 'yes' ? 'success' : ''">
                        <div class="list__card--details">
                            <span class="list__card--title js-title">{{ item.title }}</span>
                            <div class="list__card--operation" title="edit" @click="editCard($event)" :data-card-id="item.id" v-if="item.success == 'no'">
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 20" enable-background="new 0 0 22 20" xml:space="preserve"><g><path fill="#C8C8C8" d="M17.73,3.27c-1.48-1.48-2.591-1.258-2.591-1.258L9.958,7.193l-5.922,5.922L3,18l4.885-1.036l5.922-5.922 l5.182-5.181C18.988,5.861,19.21,4.75,17.73,3.27z M7.594,16.377l-1.665,0.359c-0.161-0.301-0.354-0.601-0.709-0.956 c-0.354-0.354-0.655-0.547-0.956-0.709l0.359-1.665l0.481-0.482c0,0,0.906,0.018,1.929,1.042c1.023,1.023,1.042,1.93,1.042,1.93 L7.594,16.377z"></path></g></svg>
                            </div>
                            <div class="list__card--operation list__card--finish" title="press to finish it card" @click="completeCard($event)" :data-card-id="item.id" v-if="item.success == 'no'">
                                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                     width="510px" height="510px" viewBox="0 0 510 510" style="enable-background:new 0 0 510 510;" xml:space="preserve">
                                    <path fill="#C8C8C8" d="M150.45,206.55l-35.7,35.7L229.5,357l255-255l-35.7-35.7L229.5,285.6L150.45,206.55z M459,255c0,112.2-91.8,204-204,204
                                            S51,367.2,51,255S142.8,51,255,51c20.4,0,38.25,2.55,56.1,7.65l40.801-40.8C321.3,7.65,288.15,0,255,0C114.75,0,0,114.75,0,255
                                            s114.75,255,255,255s255-114.75,255-255H459z"/>
                                </svg>
                            </div>
                            <div class="list__card--operation list__card--oper-del" title="delete" @click="removeCard($event)" :data-card-id-for-del="item.id">
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 20" enable-background="new 0 0 22 20" xml:space="preserve"><path fill="#C8C8C8" d="M18,1h-5c0-0.55-0.45-1-1-1h-2C9.45,0,9,0.45,9,1H4C3.45,1,3,1.45,3,2s0.45,1,1,1h14c0.55,0,1-0.45,1-1 S18.55,1,18,1z"></path><path fill="#C8C8C8" d="M16,4H6C4.9,4,4,4.9,4,6v12c0,1.1,0.9,2,2,2h10c1.1,0,2-0.9,2-2V6C18,4.9,17.1,4,16,4z M8,17 c0,0.55-0.45,1-1,1s-1-0.45-1-1V7c0-0.55,0.45-1,1-1s1,0.45,1,1V17z M12,17c0,0.55-0.45,1-1,1s-1-0.45-1-1V7c0-0.55,0.45-1,1-1 s1,0.45,1,1V17z M16,17c0,0.55-0.45,1-1,1s-1-0.45-1-1V7c0-0.55,0.45-1,1-1s1,0.45,1,1V17z"></path></svg>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div v-if="pageCount > 1" class="link-page__wrapper">
            <span v-for="(page, index) in pageCount">
                <div class="link-page" :class="dataPage.currentPage == (index + 1) ? 'active' : ''">
                    <router-link class="rl" :to="'/?page=' + (index + 1)" >{{ index + 1 }}</router-link>
                </div>
            </span>
        </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'home',
  data() {
    return {
        hidden: true,
        isActiveAddCard: true,
        isActiveBtnAddCard: false,
        textCard: '',
        viewCard: 10,
        dataPage: {
            start: 0,
            end: 10,
            currentPage: 1
        },
        pageCards: []
    }
  },
  methods: {
    addCard(bool) {
        if(bool) {
            this.isActiveAddCard = false;
            this.isActiveBtnAddCard = true;
        } else {
            this.isActiveAddCard = true;
            this.isActiveBtnAddCard = false;
            this.textCard = '';
            this.$refs.btnAdd.setAttribute('data-card-id', '-1');
            this.$refs.btnAdd.value = 'Добавить карточку';
        }
    },
    removeCard(e) {
        const id = e.target.getAttribute('data-card-id-for-del');

        this.$store.dispatch('removeCard', {title: '', id: id})

        if(this.pageCount == 1) {
            this.$router.push({ name: 'home' })
            this.$route.query.page = 1;
        }

        this.getCurrentPage();
    },
    reverseCard(e, insert = false) {
        if(!insert){
            if(!e.target.classList.contains('list__btn-revers-down')) {
                e.target.classList.add('list__btn-revers-down');
                this.pageCards = this.$store.getters.getOnePageRevers(this.dataPage.start, this.dataPage.end);
            } else {
                e.target.classList.remove('list__btn-revers-down');
                this.pageCards = this.$store.getters.getOnePage(this.dataPage.start, this.dataPage.end);
            }
        }

        if(this.pageCount === 1) {
          this.$store.dispatch('reverseCard', {});
        }
    },
    editCard(e) {
        const id = e.target.getAttribute('data-card-id');
        this.textCard = e.target.previousSibling.textContent;
        this.$refs.btnAdd.setAttribute('data-card-id', id);
        this.$refs.btnAdd.value = 'Сохранить изменения';
        this.addCard(true);
    },
    addCardInsert() {
        const dataId = this.$refs.btnAdd.getAttribute('data-card-id');
        let self = this;

        if(this.textCard.length === 0 || this.textCard == '') return false;

        if(this.$refs.sortBtn.classList.contains('list__btn-revers-down')) {
            this.reverseCard(null, true);
        }

        if(dataId == -1 || dataId == undefined) {
            this.$store.dispatch('addCard', {title: this.textCard, id: Date.now(), success: 'no'}).then(function(r){
                self.getCurrentPage()
            }).catch(function(err) { throw new Error(err); });
            this.addCard(false);
        } else {
            this.$store.dispatch('updateCard', {title: this.textCard, id: dataId}).then(function(r){
                self.getCurrentPage()
            }).catch(function(err) { throw new Error(err); });
            this.addCard(false);
        }

        if(this.$refs.sortBtn.classList.contains('list__btn-revers-down')) {
            this.reverseCard(null, true);
        }

        this.getCurrentPage();
    },
    completeCard(e) {
        const dataId = e.target.getAttribute('data-card-id');
        this.$store.dispatch('completeCard', {success: 'yes', id: dataId}).then(function(r){
            let el = e.path[2];

            if(el.classList.contains('list__card')) {
                el.classList.add('success');
            }

        }).catch(function(err) { throw new Error(err); });
    },
    getCurrentPage() {
        if(this.$route.query.page != undefined) {
            this.paginator(this.pageCount, this.$route.query.page)
        }

        this.pageCards = this.$store.getters.getOnePage(this.dataPage.start, this.dataPage.end);
    },
    paginator: function(totalItems, currentPage) {
      let start = (currentPage - 1) * this.viewCard,
      end = start + this.viewCard;

      this.dataPage.start = start;
      this.dataPage.end = end;
      this.dataPage.currentPage = currentPage;
    },
  },
  watch: {
    '$route' (rto, rfrom) {
       this.getCurrentPage();
    }
  },
  computed: {
        ...mapGetters(['pageCount']),
    },
  created() {
    let self = this;
    this.$store.dispatch('loadTask').then(function(r){
        self.getCurrentPage()
    }).catch(function(err) { throw new Error(err); });
  }
};
</script>
