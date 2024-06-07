<template>
    <div class="bg-gray-100">
      <div class="container mx-auto py-8">
        <div class="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
          <form @submit.prevent="createPost" class="space-y-4">
            <h2 class="text-xl font-semibold">Add Items</h2>
            <div>
              <label for="item_name" class="block">Item Name</label>
              <input type="text" id="item_name" v-model="formData.item_name" required class="w-full border rounded p-2">
            </div>
            <div>
            <label for="item_url" class="block">Item Link</label>
            <input type="text" id="item_url" v-model="formData.item_url" required class="w-full border rounded p-2">
          </div>
         
          <div>
            <label for="details" class="block">Description</label>
            <textarea id="details" v-model="formData.details" rows="4" required class="w-full border rounded p-2"></textarea>
          </div>
       
          <div>
            <label for="category" class="block">Category</label>
            <select id="category" v-model="formData.category_id" class="w-full border rounded p-2">
              <option value="1">Men</option>
              <option value="2">Ladies</option>
              <option value="3">Kids</option>
            </select>
          </div>
         
          <div>
            <label for="subcategory" class="block">Subcategory</label>
            <select id="subcategory" v-model="formData.subcategory_id" class="w-full border rounded p-2">
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
          </div>
          <div>
            <label for="price" class="block">Item Cost</label>
            <input type="text" id="price" v-model="formData.price" style="width: 30%;" required class="border rounded p-2">
          </div>
          <button type="submit" :disabled="isFormSubmitted" class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            {{ isFormSubmitted ? 'Submitting...' : 'Submit Item' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
  