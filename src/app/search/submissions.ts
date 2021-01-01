import {Comments} from './comments';

export interface Submissions extends Comments{
  url: String,
  previewUrl: String,
  title: String
}
