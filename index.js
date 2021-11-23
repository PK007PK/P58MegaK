* JK pokazuje interfejsyphp my admin i heidisql;
* kodowanie znaków,porównywanie znaków, sortowanie przy klientserwer;
- staramy się ustawić takie samo w każdym parametrze;
- tam grzie nie możemy to podobne - taki sam początek;
- użyj utf8mb4_unicode_ci; //obsłuzy zarówno pol znaczki jak i emotki

Kodowanie znaków będzie w bazach zawsze problematyczne;
- np złe kodowanie znaków może prowadzić do tracenia danych
co jest trudno zauważyć;
- bardzo często nazwa kodowania wygląda bardzo podobnie, 
ale działa inaczej;

utf8mb4_unicode_ci
- utf8mb4 - jest to poprawna implementacja utf8,
która używa 1- 4 bajty naznak.
- unicode - wskazuje na implementację
Unicode (ale bywa to mylące)
- ci - case insensitive - porównywanie odbywa się
bez względu na wielkość liter.
- to kodowanie traktuje spacje wokół tekstu jako 
nieistniejące podczas porównywania. 

Konfiguracja bazy danych:
- zainstaluj bazę danych;

phpmyadmin poprzez xampp:
http://localhost/phpmyadmin/

heidisql:
localhost
3306
root
password

Dane do połączenia z bazą danych: 
