# ベースイメージ
FROM node:20-alpine

# 作業ディレクトリを作成
WORKDIR /app

# package.jsonとlockファイルをコピー
COPY package*.json ./

# 依存関係のインストール
RUN npm install

# 全ファイルをコピー
COPY . .

# ビルド（必要なら）
RUN npm run build

# ポート開放
EXPOSE 3000

# アプリケーションの起動（dev環境）
CMD ["npm", "run", "dev"]
