from PIL import Image, ImageDraw
import os

# imagesディレクトリがなければ作成
if not os.path.exists('images'):
    os.makedirs('images')

# 選択肢用の画像を26枚生成
for i in range(1, 27):
    img = Image.new('RGB', (200, 200), color = f'hsl({(i-1)*13}, 100%, 50%)')
    d = ImageDraw.Draw(img)
    d.text((75, 90), f'Image {i}', fill=(255, 255, 255))
    img.save(f'images/image_{i:02d}.png')

# ゴール用の画像を生成
goal_img = Image.new('RGB', (400, 200), color = 'gold')
d = ImageDraw.Draw(goal_img)
d.text((150, 90), 'GOAL!', fill=(0, 0, 0))
goal_img.save('images/goal.png')

print('画像の生成が完了しました。')