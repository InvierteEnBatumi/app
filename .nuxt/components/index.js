export { default as NuxtLogo } from '../../components/NuxtLogo.vue'
export { default as Tutorial } from '../../components/Tutorial.vue'
export { default as VuetifyLogo } from '../../components/VuetifyLogo.vue'
export { default as CardsAlquileresExpensasComponent } from '../../components/cards/alquileresExpensasComponent.vue'
export { default as CardsCashFlowComponent } from '../../components/cards/cashFlowComponent.vue'
export { default as CardsHabitantesComponent } from '../../components/cards/habitantesComponent.vue'
export { default as GraphComponent } from '../../components/graph/component.vue'
export { default as GeneralAdminComponent } from '../../components/general/adminComponent.vue'
export { default as GeneralBottomBarComponent } from '../../components/general/bottomBarComponent.vue'
export { default as GeneralCloseButtonComponent } from '../../components/general/closeButtonComponent.vue'
export { default as GeneralGraphComponent } from '../../components/general/graphComponent.vue'
export { default as GeneralModalSuccessComponent } from '../../components/general/modalSuccessComponent.vue'
export { default as GeneralNavigationComponent } from '../../components/general/navigationComponent.vue'
export { default as GeneralTableComponent } from '../../components/general/tableComponent.vue'
export { default as HeadersDashboardComponent } from '../../components/headers/dashboardComponent.vue'
export { default as HeadersGeneralComponent } from '../../components/headers/generalComponent.vue'
export { default as NewsCardComponent } from '../../components/news/cardComponent.vue'
export { default as PropertiesCardComponent } from '../../components/properties/cardComponent.vue'
export { default as CardsSinglePropertyComponent } from '../../components/cards/singleProperty/component.vue'
export { default as FormsFieldsCheckboxComponent } from '../../components/forms/fields/checkboxComponent.vue'
export { default as FormsFieldsFileComponent } from '../../components/forms/fields/fileComponent.vue'
export { default as FormsFieldsPasswordComponent } from '../../components/forms/fields/passwordComponent.vue'
export { default as FormsFieldsRadioComponent } from '../../components/forms/fields/radioComponent.vue'
export { default as FormsFieldsSelectComponent } from '../../components/forms/fields/selectComponent.vue'
export { default as FormsFieldsSelectMonthComponent } from '../../components/forms/fields/selectMonthComponent.vue'
export { default as FormsFieldsTextButtonComponent } from '../../components/forms/fields/textButtonComponent.vue'
export { default as FormsFieldsTextComponent } from '../../components/forms/fields/textComponent.vue'
export { default as FormsFieldsTextareaComponent } from '../../components/forms/fields/textareaComponent.vue'
export { default as FormsFieldsTimePickerComponent } from '../../components/forms/fields/timePickerComponent.vue'
export { default as GeneralCardComponent } from '../../components/general/card/component.vue'
export { default as GeneralCardMiniComponent } from '../../components/general/card/miniComponent.vue'
export { default as GeneralCardTitleComponent } from '../../components/general/card/titleComponent.vue'
export { default as GeneralNavigationUserComponent } from '../../components/general/navigation/userComponent.vue'
export { default as GeneralUploadCardComponent } from '../../components/general/upload/cardComponent.vue'
export { default as GeneralUploadFilesComponent } from '../../components/general/upload/filesComponent.vue'
export { default as GeneralUploadSingleFileComponent } from '../../components/general/upload/singleFileComponent.vue'
export { default as CardsSinglePropertyCardComponent } from '../../components/cards/singleProperty/card/component.vue'
export { default as CardsSinglePropertyCardSheetComponent } from '../../components/cards/singleProperty/card/sheetComponent.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
