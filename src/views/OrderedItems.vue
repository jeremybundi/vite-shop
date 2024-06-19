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
          class="border rounded-md px-2 py-1 w-full md:w-48"
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

      <button @click="fetchOrders" class="bg-green-500 text-white px-4 py-2 rounded-md md:ml-4">
        Search Orders
      </button>
    </div>

    <div v-for="(order) in orders" :key="order.id" class="mb-6">
   
      <div class="md:flex md:items-start md:space-x-4">
        <div class="md:w-1/3">
          <h2 class="text-lg font-semibold">{{ order.customerName }}</h2>
          <p class="text-gray-600">{{ order.phoneNumber }}</p>
          <p class="text-gray-600">{{ order.deliveryAddress }}</p>
        </div>

        <div class="md:w-1/2">
          <ul>
            <li v-for="item in order.items" :key="item.id" class="mb-4">
              <div class="flex items-center">
                <img :src="item.item_url" alt="Item image" class="w-16 h-16 object-cover mr-4" />
                <div>
                  <h3 class="text-md font-semibold">{{ item.item_name }}</h3>
                  <p class="text-gray-600">{{ item.details }}</p>
                  <p class="text-gray-600">Quantity: {{ item.quantity }}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <!-- Right Column -->
        <div class="md:w-1/3">
          <p class="text-red-500 font-semibold">Total Price Ksh. {{ order.totalPrice }}</p>
          <p class="text-gray-600">{{ order.paymentMethod }}</p>
          <p class="text-gray-600">Order Date: {{ order.createdAt }}</p>
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
/* Your existing styles can remain unchanged */
</style>
