<template>
    <div class="bg-gray-100 min-h-screen flex items-center justify-center">
      <div class="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
        <div class="text-center mb-4">
          <h2 class="text-xl font-semibold font-serif">Add Item</h2>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <!-- First Column -->
          <div>
            <label for="item_name" class="block text-lime-500 font-serif">Item Name</label>
            <input type="text" id="item_name" v-model="formData.item_name" required class="w-full border rounded p-2">
            <label for="item_url" class="block mt-4 text-lime-500 font-serif">Item Link</label>
            <input type="text" id="item_url" v-model="formData.item_url" required class="w-full border rounded p-2">
            <label for="details" class="block mt-4 text-lime-500 font-serif">Description</label>
            <textarea id="details" v-model="formData.details" rows="4" required class="w-full border rounded p-2"></textarea>
          </div>
  
          <!-- Second Column -->
          <div>
            <label for="category" class="block text-lime-500 font-serif">Category</label>
            <select id="category" v-model="formData.category_id" class="w-full border rounded p-2 text-red-400 font-serif">
              <option value="1">Men</option>
              <option value="2">Ladies</option>
              <option value="3">Kids</option>
            </select>
            <label for="subcategory" class="block mt-4 text-lime-500 font-serif">Subcategory</label>
            <select id="subcategory" v-model="formData.subcategory_id" class="w-full border rounded p-2 text-red-400 font-serif">
              <option value="1">Men's T-shirt</option>
              <option value="2">Men's Trousers</option>
              <option value="3">Men's Suits</option>
              <option value="4">Men's Shirts</option>
                <option value="5">Men's Shoes</option>
                <option value="6">Lady Dresses</option>
                <option value="7">Lady Heels</option>
                <option value="8">Lady Sweater</option>
                <option value="9">Lady Tops</option>
                <option value="10">Crop Shirts</option>
                <option value="11">Kids' Tops</option>
                <option value="12">Kids' Bottoms</option>
                <option value="13">Kids' Dresses</option>
                <option value="14">Kids' Outwears</option> 
              
              <!-- Add other subcategories here -->
            </select>
            <label for="price" class="block mt-4 text-lime-500 font-serif">Item Cost</label>
            <input type="text" id="price" v-model="formData.price" style="width: 50%;" required class="border rounded p-2">
          </div>
        </div>
  
        <!-- Submit Button -->
        <div class="flex justify-center mt-4">
          <button type="submit" @click="createItem"    :disabled="isFormSubmitted" class="w-full bg-green-700 text-white py-2 px-4 rounded hover:bg-red-400 font-serif">
            {{ isFormSubmitted ? 'Submitting...' : 'Submit Item' }}
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
import axios from 'axios';

export default {
  data() {
    return {
      formData: {
        item_name: '',
        item_url: '',
        details: '',
        category_id: '',
        subcategory_id: '',
        price: '',
      },
      isFormSubmitted: false,
    };
  },
  methods: {
    async createItem() {
      try {
        // Field-specific validations
        let isValid = true;
        const validationErrors = [];

        if (!this.formData.item_name.trim()) {
          isValid = false;
          validationErrors.push('Item Name is required');
        }

        if (!this.formData.item_url.trim()) {
          isValid = false;
          validationErrors.push('Item Link is required');
        } else if (!/^(http|https):\/\/\S+$/.test(this.formData.item_url)) {
          isValid = false;
          validationErrors.push('Invalid Item Link format (must start with http:// or https://)');
        }

        if (!this.formData.details.trim()) {
          isValid = false;
          validationErrors.push('Description is required');
        }

        if (!this.formData.category_id) {
          isValid = false;
          validationErrors.push('Please select a Category');
        }

        if (!this.formData.subcategory_id) {
          isValid = false;
          validationErrors.push('Please select a Subcategory');
        }

        if (!this.formData.price.trim()) {
          isValid = false;
          validationErrors.push('Price is required');
        } else if (isNaN(this.formData.price) || parseFloat(this.formData.price) <= 0) {
          isValid = false;
          validationErrors.push('Invalid Price (must be a positive number)');
        }

        // Display validation errors if any
        if (!isValid) {
          console.error('Validation errors:', validationErrors);
          // You can display the errors to the user using a toast notification or similar approach
          return;
        }
  
          // Make an Axios POST request
          const response = await axios.post('/api/items/create', this.formData);
          console.log('Item created:', response.data);
  
          // Reset form data after successful submission
          this.isFormSubmitted = true;
          setTimeout(() => {
            this.isFormSubmitted = false;
            this.formData = {
              item_name: '',
              item_url: '',
              details: '',
              category_id: '',
              subcategory_id: '',
              price: '',
            };
          }, 2000);
        } catch (error) {
          console.error('Error creating item:', error);
        }
      },
    },
  };
  </script>
  
  
  <style>
  /* Add any custom styles here */
  </style>
  