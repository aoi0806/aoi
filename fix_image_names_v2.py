import os
import re

image_dir = 'images'

# goal.pngを除いた画像ファイルのリストを取得
image_files = [f for f in os.listdir(image_dir) if f.startswith('image_') and f.endswith('.png')]

# ファイル名を自然順ソートするためのキー関数
def natural_sort_key(s):
    return [int(text) if text.isdigit() else text.lower() for text in re.split('([0-9]+)', s)]

# ファイルを自然順にソート
sorted_image_files = sorted(image_files, key=natural_sort_key)

# 新しいファイル名にリネーム
for i, old_name in enumerate(sorted_image_files):
    new_name = f'image_{i+1:02d}.png'
    old_path = os.path.join(image_dir, old_name)
    new_path = os.path.join(image_dir, new_name)
    
    # 同じ名前へのリネームはスキップ
    if old_path == new_path:
        continue

    # 既に新しい名前のファイルが存在する場合は、一時的な名前にリネームしてからリネーム
    if os.path.exists(new_path):
        temp_path = os.path.join(image_dir, f'temp_{old_name}')
        print(f'Renaming {old_path} to {temp_path} (temporary)')
        os.rename(old_path, temp_path)
        old_path = temp_path

    print(f'Renaming {old_path} to {new_path}')
    os.rename(old_path, new_path)

print('画像ファイルのリネームが完了しました。')