package com.example.bupazar.page.activity.home

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.bupazar.R
import com.example.bupazar.model.Product
import com.example.bupazar.model.ProductAdapter
import com.example.bupazar.page.activity.login.LoginActivity
import com.example.bupazar.page.fragment.*
import kotlinx.android.synthetic.main.homepage_activity.*

class HomepageActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContentView(R.layout.homepage_activity)

        val homepageFragment = HomepageFragment()
        val categoriesFragment = CategoriesFragment()
        val basketFragment = BasketFragment()
        val favoritesFragment = FavoritesFragment()
        val myAccountFragment = MyAccountFragment()

        makeCurrentFragment(homepageFragment)

        bottom_navigation.setOnNavigationItemSelectedListener {
            when(it.itemId) {
                R.id.ic_home -> makeCurrentFragment(homepageFragment)
                R.id.ic_categories -> makeCurrentFragment(categoriesFragment)
                R.id.ic_basket -> makeCurrentFragment(basketFragment)
                R.id.ic_favorites -> makeCurrentFragment(favoritesFragment)
                R.id.ic_accounts -> makeCurrentFragment(myAccountFragment)
            }
            true
        }
        //buttonLogOut.setOnClickListener(){
        //    var intent= Intent(this,LoginActivity::class.java)
        //    startActivity(intent)
        //}
    }

    private fun makeCurrentFragment(fragment: Fragment) =
            supportFragmentManager.beginTransaction().apply {
                replace(R.id.fl_wrapper, fragment)
                commit()
            }
}