<template>
  <div class="bg-white text-sm p-4">
    <div class="flex flex-col md:flex-row items-center justify-between mb-4">
      <div class="mb-2 md:mb-0">
        <label for="order-number-input" class="text-gray-600 font-semibold">Order Number:</label>
        <input
          id="order-number-input"
          v-model="searchOrderNumber"
          placeholder="Enter order number"
          type="text"
          class="border bg-yellow-50 rounded-md px-2 py-1 w-full md:w-48"
          pattern="\d*"
        />
      </div>

      <div class="mb-2 md:mb-0">
        <label for="date-input" class="text-gray-600 font-semibold">Date:</label>
        <input
          id="date-input"
          v-model="searchDate"
          type="date"
          class="border rounded-md px-2 py-1 w-full md:w-48"
        />
      </div>

      <button @click="fetchOrders" class="bg-green-800 text-white font-serif text-semibold px-4 py-2 rounded-md md:ml-4">
        Search Orders
      </button>
    </div>

    <div v-for="(order) in orders" :key="order.id" class="mb-6">
   
      <div class="md:flex md:items-start md:space-x-4">
        <div class="md:w-1/3">
          <h3 class="text-sm font-bold">Order No: {{ order.id }}</h3>
          <h2 class="text-sm font-semibold">Name: {{ order.customerName }}</h2>
          <p class="text-stone-950 text-xs font-serif">Phone: {{ order.phoneNumber }}</p>
          <p class="text-stone-950 text-xs font-sans">Address: {{ order.deliveryAddress }}</p>
        </div>

        <div class="md:w-1/2">
          <ul>
            <li v-for="item in order.items" :key="item.id" class="mb-4">
              <div class="flex items-center">
                <img :src="item.item_url" alt="Item image" class="w-16 h-16 object-cover mr-4" />
                <div>
                  <h3 class="text-md font-semibold">{{ item.item_name }}</h3>
                  <p class="text-stone-950 text-xs font-mono">{{ item.details }}</p>
                  <p class="text-violet-900 font-semibold text-xs">Quantity: {{ item.quantity }}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div class="md:w-1/3">
          <p class="text-lime-800 font-semibold mb-2">Total Price:  Ksh {{ order.totalPrice }}</p>
          <p class="text-gray-600 text-xs mb-2 font-serif">Payment mode: {{ order.paymentMethod }}</p>
          <p class="text-gray-600 text-xs">Order Date: {{ order.createdAt }}</p>
        </div>
      </div>
      <hr class="my-4 border-t border-gray-300" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'OrdersList',
  data() {
    return {
      orders: [],
      searchOrderNumber: '',
      searchDate: '',
    };
  },
  mounted() {
    this.fetchOrders();
  },
  methods: {
    fetchOrders() {
      const params = new URLSearchParams();
      if (this.searchOrderNumber) params.append('orderNumber', this.searchOrderNumber);
      if (this.searchDate) params.append('startDate', this.searchDate);

      axios
        .get('/api/orders/get', { params })
        .then((response) => {
          this.orders = response.data;
          console.log(response.data)
        })
        .catch((error) => {
          console.error('There was an error fetching the orders:', error);
        });
    },
  },
};
</script>

<style scoped>

</style>
