Create the environment outside the working folder
```
virtualenv website
website\Scripts\activate
```
In the working folder
```
pip freeze > requirements.txt
wagtail start myblog
cd myblog
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```