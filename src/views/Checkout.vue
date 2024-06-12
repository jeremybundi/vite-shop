<template>
  <div class="bodyContainer mt-5">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 ml-4 ">
      <!-- Left column: Display items -->
      <div v-if="addedItems.length" class="space-y-1 mt-5 w-500">
        <div v-for="(item, index) in addedItems" :key="item.id" class="bg-white p-4 rounded-lg shadow-md">
          <div class="flex items-center space-x-4">
            <img :src="item.item_url" alt="Item Image" class="w-16 h-16 rounded-full" />
            <div>
              <h3 class="text-lg font-semibold">{{ item.item_name }}</h3>
              <p class="text-gray-500">{{ item.details }}</p>
            </div>
          </div>
          <div class="flex items-center justify-between mt-4">
            <span class="text-blue-500 font-semibold">Ksh. {{ item.price }}</span>
            <div class="flex space-x-2">
              <button @click="decrementItemQuantity(item.id)" class="text-red-500">
                <i class="fas fa-minus"></i>
              </button>
              <span class="text-blue-500">{{ item.quantity }}</span>
              <button @click="incrementItemQuantity(item.id)" class="text-green-500">
                <i class="fas fa-plus"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

          
      <div class="bg-green-50 h-1/2 w-50 mt-5 mr-5 p-4 rounded-lg shadow-md flex flex-col">
        <h3>Cart Summary</h3>
        <div class="text-blue-500 font-semibold">Total Price: Ksh. {{ totalPrice }}</div>
        <form @submit.prevent="placeOrder" class="space-y-4">
          <div class="flex">
            <label for="customerName" class="text-gray-600 w-1/4">Customer Name</label>
            <input
              type="text"
              id="customerName"
              v-model="customerName"
              placeholder="Enter your name"
              class="border rounded-md p-2 w-60 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div class="flex">
            <label for="phoneNumber" class="text-gray-600 w-1/4">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              v-model="phoneNumber"
              placeholder="Enter phone number"
              class="border rounded-md p-2 w-60 focus:outline-none focus:border-blue-500"
              pattern="\d*"
              required
            />
          </div>
          <div class="flex">
            <label for="deliveryAddress" class="text-gray-600 w-1/4">Delivery Address</label>
            <select
              id="deliveryAddress"
              v-model="deliveryAddress"
              class="border rounded-md p-2 w-60 focus:outline-none focus:border-blue-500"
              required
            >
              <option value="">Select address</option>
              <option value="kahawa_building">Kahawa Building</option>
              <option value="annex_plaza">Annex Plaza</option>
              <option value="emirates_complex">Emirates Complex</option>
            </select>
          </div>
          <div class="flex">
            <label for="paymentMethod" class="text-gray-600 w-1/4">Payment Method</label>
            <select
              id="paymentMethod"
              v-model="paymentMethod"
              class="border rounded-md p-2 w-60 focus:outline-none focus:border-blue-500"
              required
            >
              <option value="">Select method</option>
              <option value="mpesa">M-Pesa</option>
              <option value="cod">Cash on Delivery</option>
              <option value="debit_card">Debit Card</option>
            </select>
          </div>
          <button type="submit" class="bg-blue-500 text-white rounded-md py-2 px-4">
            Place Order
          </button>
        </form>
        <a href="/items" class="text-blue-500 mt-4 block">Continue shopping >></a>
      </div>

    </div>
    </div>
  
</template>

<script>
import { useAddedItemStore } from '../stores/addedItemsStore'; 
import axios from 'axios'

export default {
  data() {
    return {
      customerName: '',
      phoneNumber: '',
      deliveryAddress: '',
      paymentMethod: '',
      paymentOptions: [
        { value: '', text: 'Select Payment Method' },
        { value: 'mpesa', text: 'M-Pesa' },
        { value: 'cod', text: 'Cash on Delivery' },
        { value: 'debit_card', text: 'Debit Card' },
      ],
      deliveryOptions: [
        { value: '', text: 'Select Delivery Address' },
        { value: 'kahawa_building', text: 'Kahawa Building' },
        { value: 'annex_plaza', text: 'Annex Plaza' },
        { value: 'emirates_complex', text: 'Emirates Complex' },
      ],
    };
  },
  computed: {
    addedItems() {
      const store = useAddedItemStore();
      return store.addedItems;
      },
      totalPrice() {
      const store = useAddedItemStore();
      return store.getTotalPrice; 
    },
  },
  methods: {
    removeItem(itemId) {
      const store = useAddedItemStore();
      store.removeItem(itemId);
    },
    decrementItemQuantity(itemId) {
      const store = useAddedItemStore();
      store.decreaseItemQuantity(itemId);
    },
    incrementItemQuantity(itemId) {
      const store = useAddedItemStore();
      store.increaseItemQuantity(itemId);
    },
    async placeOrder(event) {
    
        if (!this.customerName || !this.phoneNumber || !this.deliveryAddress || !this.paymentMethod) {
          alert('Please fill in all the fields.');
          return;
        }

       const orderData = {
        customerName: this.customerName,
        phoneNumber: this.phoneNumber,
        deliveryAddress: this.deliveryAddress,
        paymentMethod: this.paymentMethod,
        items: this.addedItems.map((item) => ({
          itemId: item.id,
          quantity: item.quantity,
        })),
        totalPrice: this.totalPrice,
      };
      console.log('Order data to be sent:', orderData);

      try {
        const response = await axios.post('/api/orders', orderData);
        console.log('Order placed successfully:', response.data);
            // Clear cart
          const store = useAddedItemStore();
          store.clearCart();
    
          this.customerName = '';
          this.phoneNumber = '';
          this.deliveryAddress = '';
          this.paymentMethod = '';
      
          
        
      } catch (error) {
        console.error('Error placing order and :', error);
      }
    },
      
    },
    continueShop() {
  this.$router.push('/');
},   
  };

</script>

<style scoped>
.bodyContainer{
  background-image: url('https://i.pinimg.com/474x/52/18/93/521893c5eb2758acec2a88beb5ff0fa9.jpg');
  font-family: 'Times New Roman', Times, serif;
}

</style>
