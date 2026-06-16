-- =============================================================
-- ТАБЛИЦА: leads
-- Хранит заявки с контактной формы
-- Выполнить в: Supabase → SQL Editor
-- =============================================================

-- 1. Создание таблицы
CREATE TABLE IF NOT EXISTS public.leads (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at  TIMESTAMPTZ DEFAULT now()             NOT NULL,
  name        TEXT                                  NOT NULL,
  contact     TEXT                                  NOT NULL,
  message     TEXT                                  NOT NULL
);

-- Комментарии к колонкам
COMMENT ON TABLE  public.leads             IS 'Заявки с контактной формы сайта';
COMMENT ON COLUMN public.leads.contact     IS 'Telegram (@username) или email адрес';
COMMENT ON COLUMN public.leads.message     IS 'Текст запроса от пользователя';

-- Индекс для сортировки по дате (частый запрос в панели)
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads (created_at DESC);

-- =============================================================
-- 2. Включение Row Level Security (RLS)
-- =============================================================
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- =============================================================
-- 3. Политики безопасности
-- =============================================================

-- POLICY 1: Анонимные пользователи могут только вставлять записи.
-- Это позволяет форме на сайте работать с публичным anon-ключом,
-- не открывая доступ к чтению чужих данных.
CREATE POLICY "anon_can_insert_leads"
  ON public.leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- POLICY 2: Только авторизованные пользователи (администраторы)
-- могут читать, обновлять и удалять лиды.
-- Используется в панели управления / Supabase Studio.
CREATE POLICY "authenticated_can_read_leads"
  ON public.leads
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "authenticated_can_update_leads"
  ON public.leads
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "authenticated_can_delete_leads"
  ON public.leads
  FOR DELETE
  TO authenticated
  USING (true);

-- =============================================================
-- ПРОВЕРКА: убедитесь, что RLS включён
-- Ожидаемый результат: rowsecurity = true
-- =============================================================
-- SELECT relname, relrowsecurity FROM pg_class WHERE relname = 'leads';
