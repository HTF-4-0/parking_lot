import cv2
from matplotlib import pyplot as plt
import numpy as np
import imutils
import easyocr
import cv2

# Initialize webcam
cap = cv2.VideoCapture(0)

while True:
    # Capture a frame
    ret, frame = cap.read()
    # Show the frame
    cv2.imshow("Image Capture", frame)

    # Wait for key press
    key = cv2.waitKey(1) & 0xFF

    # Capture image on 'c' key press
    if key == ord('c'):
        cv2.imwrite("captured_image.jpg", frame)
        print("Image captured!")
        break

# Release resources
cap.release()
cv2.destroyAllWindows()



# this image will be clicked by the camera

img = cv2.imread('test-nameplate/nameplate1.jpg')
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
# plt.imshow(cv2.cvtColor(gray, cv2.COLOR_BGR2RGB))

bfilter = cv2.bilateralFilter(gray, 11, 17, 17) #Noise reduction
edged = cv2.Canny(bfilter, 30, 200) #Edge detection
plt.imshow(cv2.cvtColor(edged, cv2.COLOR_BGR2RGB))

keypoints = cv2.findContours(edged.copy(), cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
contours = imutils.grab_contours(keypoints)
contours = sorted(contours, key=cv2.contourArea, reverse=True)[:10]

location = None
for contour in contours:
    approx = cv2.approxPolyDP(contour, 10, True)
    if len(approx) == 4:
        location = approx
        break


mask = np.zeros(gray.shape, np.uint8)
new_image = cv2.drawContours(mask, [location], 0,255, -1)
new_image = cv2.bitwise_and(img, img, mask=mask)
(x,y) = np.where(mask==255)
(x1, y1) = (np.min(x), np.min(y))
(x2, y2) = (np.max(x), np.max(y))
cropped_image = gray[x1:x2+1, y1:y2+1]
# plt.imshow(cv2.cvtColor(cropped_image, cv2.COLOR_BGR2RGB))
# plt.show()


reader = easyocr.Reader(['en'])
result = reader.readtext(cropped_image)
data = ""
for item in result:
    data += item[1].replace(" ", "")
data = data.replace("'", "")
print(data)
