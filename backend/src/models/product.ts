/**
 * title — название товара, строка от 2 до 30 символов, обязательное поле, уникальное.
 * image — путь до файла и метаинформация об изображении, объект вида { fileName: string, originalName: string; }, обязательно поле.
 * category — категория товара, строка, обязательное поле.
 * description — описание товара, строка, необязательное поле.
 * price — цена товара, число, необязательное поле, по умолчанию null.
 */

import mongoose, {Schema, model} from "mongoose";
import { IProduct } from "../utils/types";

const productSchema = new Schema<IProduct>({
  title: {
    type: String,
    required: [true, 'title is required'],
    minlength: 2,
    maxlength: 30,
    unique: true
  },
  image: {
    fileName: {
      type: String,
      required: true,
    },
    originalName: {
      type: String,
      required: true
    }
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    default: null
  }
});

export default model<IProduct>('product', productSchema);