import pandas as pd
import requests, re
import shutil


database = pd.read_csv('data\\person_2020_update.csv')

top_50 = database.sort_values('hpi',ascending=False).head(50)

url = "https://en.wikipedia.org/wiki/"
# with open("data\\top50descriptions\\descriptions.js","w", encoding='utf-8') as f:
#     f.write('const top_descriptions = [')


for i in range(len(top_50)):
    elem = top_50['slug'][i]
    r = requests.get(url + elem)

    if r.status_code != 200:
        Exception(f"Error Loading Wikipedia Page for {top_50['name'][i]}")
    print(url + elem)
    # Image Links
    td = re.search('<td colspan="\d" class="infobox-image( photo)?">.*</td>',r.text)
    if td is None:
        td = re.search('<div class="thumbinner" style=".*"><a href=".*" class="image">', r.text)
    a = re.search('<a href=".*" class="image"',td.group(0))

    link = re.search('File:.*\.(jpg|png|JPG|PNG)" class="image"',a.group())
    link = re.search('File:.*\.(jpg|png|JPG|PNG)',link.group())

    r_next = requests.get(url + link.group(),allow_redirects = True)
    
    filtered_link = link.group().replace(',','%2C')
    filtered_link = filtered_link.replace('(','%28')
    filtered_link = filtered_link.replace(')','%29')

    og_file_link = re.search("//upload.wikimedia.org/wikipedia/commons/(\w|\d)+/(\w|\d)+/" + filtered_link[5:],r_next.text)
    print(og_file_link.group())

    response = requests.get("https:" + og_file_link.group(), stream=True,allow_redirects=True)
    try: 
        with open(f"data\\top50images\\{elem}.{link.group()[-3:]}",'wb') as img:
            for chunk in response:
                img.write(chunk)
    except Exception as error:
        print(error)


#     # Descriptions
#     p1 = re.search('<p>.*',r.text)
#     with open('data\\top50descriptions\\descriptions.js', 'a',encoding='utf-8') as f:
#         if i != 0:
#             f.write(f",`{p1.group()}</p>`")
#         else:
#             f.write(f"`{p1.group()}</p>`")
            


# with open('data\\top50descriptions\\descriptions.js', 'a',encoding='utf-8') as f:
#     f.write(']')
