package com.example.bupazar.page.fragment

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.content.ContextCompat
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.bupazar.R
import com.example.bupazar.model.*
import com.example.bupazar.service.RestApiService
import kotlinx.android.synthetic.main.fragment_cart.*
import kotlinx.android.synthetic.main.fragment_homepage.*
import kotlinx.android.synthetic.main.fragment_product.*

private const val ARG_AUTH_TOKEN = "authToken"

class CartFragment : Fragment() {

    private var userData: LoginResponse? = null
    private var authToken: String? = null
    private var productsInCart: Array<CartProduct>? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        arguments?.let {
            userData = arguments?.getSerializable("USERDATA") as LoginResponse
        }
        authToken = userData?.authToken
        authToken = "Token " + authToken

        val apiService = RestApiService()
        apiService.getCart(authToken!!){
            if (it == null) {

            }
            else {
                productsInCart = it.cartProducts
                numberOfProductsText.text = "My Cart (" + productsInCart!!.size + " Products)"

                val cartProductAdapter = this.context?.let { productsInCart?.let { it1 -> CartProductAdapter(it, cartProducts = it1) } }
                cartProducts.adapter = cartProductAdapter
                cartProducts.layoutManager = LinearLayoutManager(this.context)
            }
        }
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_cart, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        val cartProductAdapter = this.context?.let { productsInCart?.let { it1 -> CartProductAdapter(it, cartProducts = it1) } }
        cartProducts.adapter = cartProductAdapter
        cartProducts.layoutManager = LinearLayoutManager(this.context)
    }

    companion object {
        @JvmStatic
        fun newInstance(param1: String, param2: String) =
            CartFragment().apply {
                arguments = Bundle().apply {
                }
            }
    }
}