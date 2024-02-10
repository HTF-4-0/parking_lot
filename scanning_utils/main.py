import testract as park
import db_utils as db

# park.image_park("test/car-1.jpg")
db.view_parking()
park.image_park("test/car-2.jpg")
db.view_parking()
park.image_park("test/car-3.jpg")
db.view_parking()
# park.image_unpark("test/car-1.jpg")
# db.view_parking()
park.image_unpark("test/car-2.jpg")
db.view_parking()
park.image_unpark("test/car-3.jpg")
db.view_parking()


