<a rel="license" href="[https://github.com/timsmr/ICT.HACK-IV/blob/main/LICENSE]"><img alt="Creative Commons Licence"
style="border-width:0" src="https://camo.githubusercontent.com/8935c1c469baaaff5f6efbce5bf38e51b2e8c8502ab49336064cc2bf05b0cd30/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f6c6963656e73652f65766c6b6f2f4943546f6e426f74" /></a>

<img src='https://user-images.githubusercontent.com/63160594/206897763-ae44cd6c-629f-4fcb-bc38-c39742e51c90.png' width='100'>



# ICT-HACK-V | Цифровая платформа

# Описание

Цифровая платформа - площадка, которая позволит обеспечить быстрое и гибкое построение коммерческих связей между талантливыми студентами и крупными компаниями.

Идея нашего проекта заключается в разработке площадки для осуществления коммуникации студентов (в первую очередь ИТМО), которые заинтересованы не только в развитии своих технических компетенций, но и в понимании механизмов управления компанией. 

Значимой особенностью нашего проекта мы считаем предоставление студентам возможности участвовать в разработке некоммерческих проектов, имеющих минимальные требования к техническим навыкам, и создавать их самостоятельно. Это позволит привлечь на платформу не только студентов, готовых к коммерческой разработке, но и ребят, которые в перспективе смогут поднять свой уровень на платформе и впоследствии стать ценными кадрами для компаний-партнеров платформы. Мы хотим, чтобы в реализованном нами проекте студенты взаимодействовали не только с компаниями-заказчиками, но и вступали в коллаборации с другими студентами для совместного развития и/или создания общих проектов. 

Проект был разработан в рамках ICT.HACK-V, который проводился факультетом ИКТ на базе Университета ИТМО города Санкт-Петербурга 9-11 декабря 2022 года.



# Установка
backend


Установка на локальной машине для разработки

1.Установить postgresql
2.создать базу пустую базу данных
3.В проекте перейти в папку backend
3.1 создать виртуальное окружение 
3.2 в консоли pip install -r requirements.txt
3.3 в файлах backend/app/dbManager/dbManager.py и /backend/alembic_/env.py 
изменить переменные db_username, db_password и db_name на имя пользователя postgrsql, пароль пользователя и название базы данных соответственно
4.в консоли alembic upgrade head
5. запускаем проект uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

*для создание миграции в процессе разработки после изменения файла Entities.py в консоли ввести alembic revision --autogenerate -m "название миграции"
Запуск в docker
1. установить docker-compose
2. перейти в папку backend
3. в консоли docker-compose up -d --build


# Дополнительно

[Ссылка на разработанный нами концепт платформы в Figma](https://www.figma.com/file/jGSuQvwiHX4dSR6ez00nHU/%D1%81%D0%B2%D0%B5%D0%BA%D0%BB%D0%BE "Наслаждайтесь!")



# Заключение

Проект был разработан студентами ФИКТ Университета ИТМО:

- [Смирнов Тимур](https://github.com/timsmr)
- [Титенко Елена](https://github.com/oxxawsm)
- [Асонов Николай](https://github.com/AsonovNikolay)

Если вам интересен данный проект, мы открыты к предложениям. Канал обратной связи: smrtim17@gmail.com
