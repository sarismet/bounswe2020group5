package com.example.bupazar.model

import com.google.gson.annotations.SerializedName

data class ProductDetails (
    @SerializedName("id") val productId: Long?,
    @SerializedName("name") val name: String?,
    @SerializedName("price") val price: String?,
    @SerializedName("description") val description: String?,
    @SerializedName("image_url") val imageUrl: String?,
    @SerializedName("category") val category: String?,
)