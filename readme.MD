### Basic Set Up
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
### Wagtail Basic
#### Model, Page, and Template
[reference](http://docs.wagtail.io/en/v1.13.1/topics/pages.html)
The **Page** and its **editor interface** in Wagtail admin are created through Django **model**. All page models must inherit from the *wagtail.wagtailcore.models.Page* class.  
The Model defines:  
* Fields - It defines database fields of the Page, you can use any field type that Django provides.  
* Editing Pannel - It defines the capabilities and the layout of the editing interface. The syntax is *content_panels*.  
The Page in Wagtail Admin follows the concept of hierachical tree structures consisting of nodes and leaves. You can create as many as pages as children of a different page.  
Each Model corresponds to one Page in Wagtail admin. Each Page points to one HTML template as the frontend. Therefore, a HTML template have to be created for each page model created. Wagtail target the template using the Page Model name seperated by underscore.
<img src="1.PNG" width="480">  

### Configuring Instance Behavior 
[reference](https://thinkster.io/tutorials/deploying-a-django-application-to-elastic-beanstalk)
Elastic Beanstalk instances can be configured using a .ebextensions folder in the root of the repository. YAML configuration files placed in this folder will be read in alphabetical order so configuration files can easily be split up to run in stages by prefixing their file names with a number.