from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.chrome.options import Options

from datetime import datetime
import time
import sys

from auth import login_credentials
import csv

def is_after(time1, time2):
    '''
    time format as string:  hh:mm
    '''

    one = datetime.strptime(time1, '%H:%M')
    two = datetime.strptime(time2, '%H:%M')
    #print(one, two)
    return one > two


chrome_options = Options()
chrome_options.add_argument("--headless")

driver = webdriver.Chrome(options = chrome_options)
driver.set_window_size(1440, 900)
driver.get("https://flow.polar.com/login")
print("opened login page")
WebDriverWait(driver, 10).until(expected_conditions.presence_of_element_located((By.CSS_SELECTOR, "#email")))

time.sleep(.1)

email = driver.find_element_by_id("email")
password = driver.find_element_by_id("password")
login = driver.find_element_by_id("login")

email.send_keys(login_credentials["email"])
password.send_keys(login_credentials["password"])
login.click()
print("logged in")
try:

    WebDriverWait(driver, 10).until(expected_conditions.presence_of_element_located((By.XPATH, "//*[@id='activity-summary']")))
    driver.get("https://flow.polar.com/diary/activity")

    print("opened activity page")

    last_sync_selector = "#activity-graph-last_sync"
    try:
        last_sync = WebDriverWait(driver, 2).until(expected_conditions.presence_of_element_located((By.CSS_SELECTOR, last_sync_selector))).get_attribute("innerHTML").split(" ")[-1]
        print(last_sync)
    except:
        pass

    arrow_left_selector = ".icon-arrow-left"
    arrow = driver.find_element_by_css_selector(arrow_left_selector).click()
    # WebDriverWait(driver, 10).until(expected_conditions.presence_of_element_located((By.CSS_SELECTOR, last_sync_selector)))
    print("navigated to yesterday")
    chart_selector = ".highcharts-root"
    time_selector = ".highcharts-tooltip table tbody tr:nth-child(1) span"
    hr_selector = ".highcharts-tooltip table tbody tr:nth-child(2) span"
    
    chart = driver.find_element_by_css_selector(chart_selector)
    location = chart.location
    width, height = chart.size['width'], chart.size['height']

    print(location, width)
    ac = ActionChains(driver)
    ac.move_to_element(chart).click().perform()
    time.sleep(.5)
    ac.move_to_element(chart).move_by_offset(-width/2.0, 0).click().perform()
    # ac.reset_actions()
    # ac.move_to_element(chart)
    step = 4
    prev = '00:00'
    data = {'time':[],'heartrate':[]}
    for x in range(0,width,step):
        ac = ActionChains(driver)
        ac.move_by_offset(step,0)
        ac.click()
        ac.perform()
        
        #time.sleep(.5)
        timestamp = driver.find_element_by_css_selector(time_selector).get_attribute("innerHTML")
        hr = driver.find_element_by_css_selector(hr_selector).get_attribute("innerHTML").split(' ')[0]
        
        try:
            data["time"][-1]
        except:
            data['time'].append(timestamp)
            data['heartrate'].append(hr)

        if(timestamp != data["time"][-1]):
            
            data['time'].append(timestamp)
            data['heartrate'].append(hr)

        print(timestamp, hr)


    with open("data.csv", 'w', newline="") as f: 
        writer = csv.writer(f)
        writer.writerow(["time","heartrate"])
        for i, timestamp in enumerate(data["time"]):
            hr = data["heartrate"][i]

            line = [timestamp, hr]
            writer.writerow(line)
    print("wrote data to csv file")
    

except:
    print("exception occured")
    # time.sleep(200)
    driver.quit()
    sys.exit(1)
finally:
    driver.quit()

sys.exit(0)


