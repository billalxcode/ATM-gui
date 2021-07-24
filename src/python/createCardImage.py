# Copyright (c) Billal Fauzan - billal.xcode@gmail.com
#           Automated Taller Machine

from os import getcwd
from sys import argv
from sys import stdout
from PIL import Image, ImageDraw, ImageFont
import qrcode

def process(credit_number):
    font_file = getcwd() + "/database/CREDC___.ttf"
    template_file = getcwd() + "/database/templates.png"
    image = Image.open(template_file)
    card_number_font = ImageFont.truetype(font_file, 74)
    image_draw = ImageDraw.Draw(image)
    image_draw.text((549, 630), credit_number, font=card_number_font, fill=(255, 255, 255))

    ## Paste qrcode
    qr = qrcode.QRCode(
        error_correction = qrcode.ERROR_CORRECT_H
    )
    qr.add_data(credit_number)
    qr_image = qr.make_image()
    
    try:
        image.paste(qr_image, (75, 660))
    except IOError:
        pass

    image.save("card.png")

if __name__ == "__main__":
    try:
        creditcard = argv[1]
        splts = creditcard.split(" ")
        if len(splts) == 4:
            process(creditcard)
            print ("ok")
        else:
            print ("Nomor yang anda masukan tidak sesuai dengan format yang sudah ditentukan")
        stdout.flush()
    except IndexError:
        print ("Masukan nomor kartu kredit")
        stdout.flush()