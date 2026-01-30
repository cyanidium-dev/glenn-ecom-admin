import {defineType, defineField} from 'sanity'
import {CogIcon} from '@sanity/icons'

export const settings = defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'shippingCost',
      title: 'Shipping Cost (CHF)',
      type: 'number',
      description: 'Shipping cost in Swiss Francs (20CHF by default)',
      initialValue: 20,
      validation: (Rule) => Rule.required().min(0),
    }),
    // defineField({
    //   name: 'taxRate',
    //   title: 'Taxes (%)',
    //   type: 'number',
    //   description: 'Taxes in %  (0 by default)',
    //   initialValue: 0,
    //   validation: (Rule) => Rule.required().min(0).max(100),
    // }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Global Store Settingsуу',
        subtitle: 'Manage shipping and taxes',
      }
    },
  },
})
