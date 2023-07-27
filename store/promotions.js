//create promotion store with vuex 
export const state = () => ({
  promotions: [],
  promotion: {
    data:{
      revalorization:[],
        estimated_annual_return: 0,
        purchase_date:'2022-02-2'
    },
    main_picture: {
        url: ''
      },
      file:{
        url:''
      }
  },
})
const qs = require('qs')
export const mutations = {
  setPromotions(state, promotions) {
    state.promotions = promotions
  },
  setPromotion(state, promotion) {
    console.log(promotion)
    state.promotion = promotion
  },
  setPromotionTypes(state, promotion_types) {
    state.promotion_types = promotion_types
  }
}

export const actions = {
  async findAll({
    commit
  }, params = {}) {
    const promotions = await this.$axios.get(`/promotions`, {
      params: params,
      paramsSerializer: params => {
        return qs.stringify(params, {
          arrayFormat: 'brackets'
        })
      }
    })
    commit('setPromotions', promotions.data)
  },
  async find({
    commit
  }, id) {
    const promotion = await this.$axios.$get(`/promotions/${id}`,{
        params:{
            populate:'*'
        }
    })
    commit('setPromotion', promotion.data)
  },
}

export const getters = {
  getAll(state) {
    return state.promotions
  },
  get(state) {
    return state.promotion
  }
}
