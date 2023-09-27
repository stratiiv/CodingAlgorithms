# Coding Algorithms
The application allows the user using the Heming algorithm to convert the specified symbol into noise-tolerant code to transmit it to the communication channel and decode the received encoded symbol, while checking for error and then correct; find the optimal binary code for the input alphabet using the Huffman and Shannon-Fano algorithms. The appendix also contains a theoretical part for acquaintance with the algorithms of information coding and a separate manual for the training course "Information Theory and Coding".

## Technologies Used
* Python
* Django
* JavaScript
* HTML&CSS

## Algorithms 
The qualification work includes implementations of the following algorithms:
* Hamming algorithm
* Huffman algorithm
* Shannon-Fano algorithm.

## Installation
1. Clone the repository.
2. Create and activate a virtual environment.
3. Install the required dependencies:
```
pip install -r requirements.txt
```
4. Set up the database by running the migrations:
```
python manage.py migrate
```
5. Create a superuser to access the admin panel:

```
python manage.py createsuperuser
```
6. Start the development server:
```
python manage.py runserver
```
Access the application at http://localhost:8000 in your web browser.


