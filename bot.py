from selenium import webdriver
from config import keys
import urllib.request as urllib2
import urllib.error as url_error
import time
from selenium.webdriver.chrome.options import Options



def timeme(method):
    def wrapper(*args, **kw):
        startTime = int(round(time.time() * 1000))
        result = method(*args, **kw)
        endTime = int(round(time.time() * 1000))
        print((endTime - startTime)/1000, 's')
        return result
    return wrapper



def card(year):
    lst = []
    nm = 2019
    for i in range(12):
        lst.append(nm)
        nm += 1
    return lst.index(year)

@timeme
def order(driver, k):
    #get product
    driver.get(k['product_url'])
    #add to basket
    time.sleep(0.5)
    driver.find_element_by_xpath('//*[@id="add-remove-buttons"]/input').click()
    time.sleep(0.1)
    #go to basket
    driver.find_element_by_xpath('//*[@id="cart"]/a[2]').click()
    #form-name
    driver.find_element_by_xpath('//*[@id="order_billing_name"]').send_keys(k["name"])
    #form-email
    driver.find_element_by_xpath('//*[@id="order_email"]').send_keys(k["email"])
    #form-phone-number
    driver.find_element_by_xpath('//*[@id="order_tel"]').send_keys(k["phone_number"])
    #form-address-1
    driver.find_element_by_xpath('//*[@id="bo"]').send_keys(k["address"])
    #form-address-2
    # driver.find_element_by_xpath('//*[@id="oba3"]').send_keys("address2")
    #form-address-3
    # driver.find_element_by_xpath('//*[@id="order_billing_address_3"]').send_keys(k["address3"])
    # form-city
    driver.find_element_by_xpath('//*[@id="order_billing_city"]').send_keys(k["city"])
    # form-zip
    driver.find_element_by_xpath('//*[@id="order_billing_zip"]').send_keys(k["zip"])
    # form-billng-country
    driver.find_element_by_xpath('//*[@id="order_billing_country"]/option[26]').click()
    # form-card-number
    driver.find_element_by_xpath('// *[ @ id = "cnb"]').send_keys(k["card_number"])
    # form-card-cvv
    driver.find_element_by_xpath('//*[@id="vval"]').send_keys(k["card_cvv"])
    # form-card-month
    driver.find_element_by_xpath(f'//*[@id="credit_card_month"]/option[{k["card_month"]}]').click()
    # form-card-year
    driver.find_element_by_xpath(f'//*[@id="credit_card_year"]/option[{card(int(k["card_year"]))}]').click()
    #form-state
    driver.find_element_by_xpath('//*[@id="cart-cc"]/fieldset/p/label').click()


    #process payment
    driver.find_element_by_xpath('//*[@id="pay"]/input').click()

def get_source_code(url):
    print(url)
    text=''
    try:
        response = urllib2.urlopen(url)
        text = str(response.read())
    except url_error.HTTPError as f:
        print("Brak odpowiedzi od serwera")
        print('Error code: ', f.code)
    except url_error.URLError as e:
        print("Zły url")
        print('Error code: ', e.reason)

    return text

def get_item_url(key, color, category):
    code = get_source_code("https://www.supremenewyork.com/shop/all/" + category)
    while(True):
        position = code.find(key)
        code = code[position:len(code)-1]
        index = code[0:200].find(color)
        if(index!=-1):
            key_link = "href=\""
            position = code.find(key_link)
            code = code[position + len(key_link):position+200]
            break
        else:
            #uciecie na poczatku zeby nie znajdowalo znowu tej samej kolorystyki co wczesniej
            code = code[len(key):len(code)-1]


    code_parts = code.split("\"")
    print(code_parts[0])
    return "https://www.supremenewyork.com/" + code_parts[0]



if __name__ == '__main__':
    keys["product_url"]= get_item_url(key = "Digital", color = "Black", category="sweatshirts")
    options = webdriver.ChromeOptions()
    options.add_argument('user-data-dir=www.supremenewyork.com')
    #options.add_argument('--headless')
    #options.add_experimental_option("detach", True)
    driver = webdriver.Chrome(options=options)
    order(driver,keys)
    

