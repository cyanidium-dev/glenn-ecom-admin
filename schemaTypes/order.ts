import {defineType, defineField} from 'sanity'
import {BasketIcon} from '@sanity/icons'

export const order = defineType({
  name: 'order',
  title: 'Orders',
  type: 'document',
  icon: BasketIcon,
  fields: [
    defineField({
      name: 'orderNumber',
      title: 'Order mumber',
      type: 'string',
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Payment status',
      type: 'string',
      options: {
        list: [
          {title: 'pending', value: 'pending'},
          {title: 'paid', value: 'paid'},
          {title: 'error', value: 'error'},
          {title: 'sent', value: 'sent'},
        ],
      },
      initialValue: 'pending',
    }),
    defineField({
      name: 'customerName',
      title: 'Customer name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'customerLastName',
      title: 'Customer last name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'customerEmail',
      title: 'Customer email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'customerPhone',
      title: 'Customer Phone',
      type: 'string',
      description: '+41765376693',
      validation: (Rule) =>
        Rule.custom((phone) => {
          if (!phone) return true
          const regex = /^\+?[0-9\s\-()]{7,20}$/
          return regex.test(phone) ? true : 'Enter a valid phone number'
        }),
    }),
    defineField({
      name: 'address',
      title: 'Shipping address',
      type: 'object',
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({name: 'country', title: 'country', type: 'string'}),
        defineField({name: 'city', title: 'city', type: 'string'}),
        defineField({name: 'street', title: 'street', type: 'string'}),
        defineField({name: 'zipCode', title: 'zipCode', type: 'string'}),
      ],
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      validation: (Rule) => Rule.required().min(1).error('Замовлення не може бути порожнім'),
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'product',
              title: 'Product (Record)',
              type: 'reference',
              to: [{type: 'record'}],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'productName',
              title: 'Product Name at Purchase',
              type: 'string',
              validation: (Rule) => Rule.required().error('Назва товару обов’язкова'),
            }),
            defineField({
              name: 'priceAtPurchase',
              title: 'Price at Purchase (CHF)',
              type: 'number',
              validation: (Rule) => Rule.required().min(0).error('Ціна має бути вказана'),
            }),
            defineField({
              name: 'quantity', // Важливо: маленька літера "q", щоб збігалося з preview нижче
              title: 'Quantity',
              type: 'number',
              validation: (Rule) =>
                Rule.required().positive().integer().error('Кількість має бути цілим числом > 0'),
            }),
          ],
          preview: {
            select: {
              title: 'productName',
              quantity: 'quantity',
              price: 'priceAtPurchase',
            },
            prepare({title, quantity, price}) {
              const qty = quantity || 0
              const prc = price || 0
              return {
                title: `${title || 'Невідомий товар'} x${qty}`,
                subtitle: `${(prc * qty).toFixed(2)} CHF`,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'totalPrice',
      title: 'Total price (CHF)',
      type: 'number',
      description: 'Total price + shipping in Swiss Francs',
      readOnly: true,
    }),
    defineField({
      name: 'shippingCost',
      title: 'Shipping Cost (CHF)',
      type: 'number',
      readOnly: true,
    }),
    defineField({
      name: 'stripeSessionId',
      title: 'Stripe Session ID',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'createdAt',
      title: 'created at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'orderNumber',
      customer: 'customerName',
      total: 'totalPrice',
      status: 'status',
    },
    prepare({title, customer, total, status}) {
      return {
        title: `${title} (${status})`,
        subtitle: `${customer} — ${total} CHF`,
      }
    },
  },
})
