from selenium import webdriver
import time

# 크롬 웹 드라이버의 경로를 설정합니다.
# 윈도우의 경우 ex) "C:\chrome_driver\80\chromedriver.exe"
# 맥의 경우는 PATH가 설정되어 있으므로, webdriver.Chrome() 만 선언해도 됩니다.
driver = webdriver.Chrome("C:\JOKA\STUDY\WEB\Google_Selenium\Selenium\chromedriver.exe")

# 접속할 url
url = "https://www.google.com"

# 접속 시도
driver.get(url)



# 웹페이지가 로딩되기까지 시간이 필요해서 sleep을 이용해서 조금 기다립니다.
time.sleep(0.5) ## 0.5초

# driver.find_element_by_name(<element의 name>).send_keys(<검색어>)
search = driver.find_element_by_name('q')
search.send_keys("CINQUANTA COLLEZIONE")

search.submit()


image_tab = driver.find_element_by_class_name('hide-focus-ring')

image_tab.click()


image = driver.find_element_by_id("islrg").find_element_by_class_name("islrc").find_element_by_tag_name("div:nth-child(1)")

image.click()
# good
