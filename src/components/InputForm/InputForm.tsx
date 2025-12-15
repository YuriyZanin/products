import { addProduct } from '@/slices/product.slice';
import type { AppDispatch } from '@/store/store';
import { useRef, useState, type FC } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import styles from './InputForm.module.css';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/lib/routes';
import defaultImage from '../../assets/chess.png';
import { MAX_FILE_SIZE, MIN_TEXT_LENGTH } from '@/constants';
import { Button } from '../Button/Button';

export const InputForm: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState(defaultImage);
  const [text, setText] = useState<string>('');
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const currentUrlRef = useRef<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);
    if (!file.type.startsWith('image/')) {
      setUploadError('Только изображения!');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setUploadError('Файл слишком большой (макс. 5 МБ)');
      return;
    }

    if (currentUrlRef.current) {
      URL.revokeObjectURL(currentUrlRef.current);
      currentUrlRef.current = null;
    }

    try {
      const objectUrl = URL.createObjectURL(file);
      currentUrlRef.current = objectUrl;
      setImageUrl(objectUrl);
    } catch (error) {
      void error;
      setUploadError(
        'Не удалось обработать изображение. Попробуйте другой файл'
      );
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError('');

    const trimmedText = text.trim();
    if (trimmedText.length < MIN_TEXT_LENGTH) {
      setFormError(
        `Минимум ${MIN_TEXT_LENGTH} символов (введено: ${trimmedText.length})`
      );
      return;
    }

    const newProduct = {
      id: uuidv4(),
      text,
      liked: false,
      picture: imageUrl,
    };
    dispatch(addProduct(newProduct));
    setText('');
    navigate(ROUTES.home);
  };

  const handleCancel = () => {
    navigate(ROUTES.home);
  };

  return (
    <div>
      <form
        className={styles.InputForm}
        action="submit"
        onSubmit={handleSubmit}
      >
        <img className={styles.imagePreview} src={imageUrl} alt="Фото группы" />
        <div className={styles.fileInput}>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            id="fileInput"
          />
          {uploadError && (
            <div className={styles.errorMessage}>{uploadError}</div>
          )}
        </div>
        <div className={styles.textInput}>
          <textarea
            id="comments"
            name="comments"
            value={text}
            onChange={e => {
              setText(e.target.value);
            }}
            placeholder="Описание"
            rows={10}
            cols={50}
          />
          {formError && <div className={styles.errorMessage}>{formError}</div>}
        </div>
        <div className={styles.formButtons}>
          <Button type="submit">Добавить</Button>
          <Button onClick={handleCancel}>Отменить</Button>
        </div>
      </form>
    </div>
  );
};
