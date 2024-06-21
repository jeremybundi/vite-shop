<template>
  <div class="bg-gray-100 min-h-screen flex items-center justify-center
" style="background-image: url(https://i.pinimg.com/564x/37/0b/a6/370ba6f1cf1463128776c48547da7ded.jpg);">
    <div class="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
      <div class="text-center mb-2 mt-4">
        <h2 class="text-xl font-semibold font-serif">Add Item</h2>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label for="item_name" class="block text-rose-800 font-bold font-serif">Item Name</label>
          <input type="text" id="item_name" v-model="formData.item_name" required class="w-full border text-fuchsia-600 rounded p-2">
          <p v-if="formErrors.item_name" class="text-red-500 text-xs italic">{{ formErrors.item_name }}</p>

          <label for="item_url" class="block mt-4 text-rose-800 font-bold font-serif">Item Link</label>
          <input type="text" id="item_url" v-model="formData.item_url" required class="w-full text-fuchsia-600 border rounded p-2">
          <p v-if="formErrors.item_url" class="text-red-500 text-xs italic">{{ formErrors.item_url }}</p>

          <label for="details" class="block mt-4 text-rose-800 font-bold font-serif">Description</label>
          <textarea id="details" v-model="formData.details" rows="4" required class="w-full border rounded p-2"></textarea>
          <p v-if="formErrors.details" class="text-red-500 text-xs italic">{{ formErrors.details }}</p>
        </div>

        <div>
          <label for="category" class="block text-rose-800 font-bold font-serif">Category</label>
            <select id="category" v-model="formData.category_id" class="w-full border rounded p-2 text-red-400 font-serif">
              <option value="1">Men</option>
              <option value="2">Ladies</option>
              <option value="3">Kids</option>
            </select>
            <label for="subcategory" class="block mt-4 text-rose-800 font-bold font-serif">Subcategory</label>
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
              
            </select>
          <label for="price" class="block mt-4 text-rose-800 font-bold font-serif">Item Cost</label>
          <input type="text" id="price" v-model="formData.price" style="width: 50%;" required class="text-fuchsia-600 border rounded p-2">
          <p v-if="formErrors.price" class="text-red-500 text-xs italic">{{ formErrors.price }}</p>
        </div>
      </div>

      <div class="flex justify-center mt-4">
        <button type="submit" @click.prevent="createItem"
         :disabled="isFormSubmitted"
         class="w-full bg-green-700 text-white py-2 px-4 rounded hover:bg-lime-300 font-serif">
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
      formErrors: {},
      isFormSubmitted: false,
    };
  },
  methods: {
    validateForm() {
      const errors = {};
      if (!this.formData.item_name || !/^[a-zA-Z\s'-.]+$/.test(this.formData.item_name)) {
          errors.item_name = 'Item name must contain only letters, hyphens, or apostrophes.';
      }
      if (!this.formData.item_url || !/^(https?:\/\/[^\s$.?#].[^\s]*)$/i.test(this.formData.item_url)) {
        errors.item_url = 'Item URL must be a valid link.';
      }
      if (!this.formData.details || !/^[a-zA-Z\s'-.]+$/.test(this.formData.details)) {
          errors.details = 'Item name must contain only letters, hyphens, or apostrophes.';
        }
        if (!this.formData.price || !/^\d+$/.test(this.formData.price)) {
          errors.price = 'Price must be a number without decimals.';
        }
      return errors;
    },
    async createItem() {
      this.isFormSubmitted = true;
      this.formErrors = this.validateForm();

      if (Object.keys(this.formErrors).length === 0) {
        try {
          
          const response = await axios.post('/api/items/create', this.formData);
          console.log('Item created:', response.data);
          
        
          setTimeout(() => {
            this.isFormSubmitted = false;
            this.resetFormData();
          }, 3000);
        } catch (error) {
          console.error('Error creating item:', error);
          
          this.isFormSubmitted = false;
        }
      } else {
        
        console.error('Form validation errors:', formErrors);
        
        this.isFormSubmitted = false;
      }
    },
    resetFormData() {
      this.formData = {
        item_name: '',
        item_url: '',
        details: '',
        category_id: '',
        subcategory_id: '',
        price: '',
      };
    }
  }
};


  </script>
  
  
  <style>
  </style>
  