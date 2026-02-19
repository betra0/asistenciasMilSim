-- Rangos
INSERT INTO ranks (rank_name) VALUES
('Oficiales'),
('Cadetes'),
('Aspirantes'),
('Reclutas');

-- Oficiales
INSERT INTO members (nickname, rank_id)
SELECT 'Pegaso', id FROM ranks WHERE rank_name = 'Oficiales';
INSERT INTO members (nickname, rank_id)
SELECT 'Eban', id FROM ranks WHERE rank_name = 'Oficiales';
INSERT INTO members (nickname, rank_id)
SELECT 'Lucho', id FROM ranks WHERE rank_name = 'Oficiales';
INSERT INTO members (nickname, rank_id)
SELECT 'Venom', id FROM ranks WHERE rank_name = 'Oficiales';
INSERT INTO members (nickname, rank_id)
SELECT 'Gonxol', id FROM ranks WHERE rank_name = 'Oficiales';

-- Cadetes
INSERT INTO members (nickname, rank_id)
SELECT 'Gestgu', id FROM ranks WHERE rank_name = 'Cadetes';
INSERT INTO members (nickname, rank_id)
SELECT 'Pepos', id FROM ranks WHERE rank_name = 'Cadetes';
INSERT INTO members (nickname, rank_id)
SELECT 'Necros', id FROM ranks WHERE rank_name = 'Cadetes';
INSERT INTO members (nickname, rank_id)
SELECT 'Daniel', id FROM ranks WHERE rank_name = 'Cadetes';

-- Aspirantes
INSERT INTO members (nickname, rank_id)
SELECT name, id
FROM (
    VALUES
    ('Butin'), ('Carcho'), ('Fredy'), ('Panamasado'), ('Calaca'),
    ('Elbno'), ('Carrera'), ('Caracol'), ('Ncu'), ('Mitzio'),
    ('Sonidero'), ('Hunter'), ('Marucha'), ('Miyamas'), ('Tengu'),
    ('HardB')
) AS v(name)
CROSS JOIN (SELECT id FROM ranks WHERE rank_name = 'Aspirantes') r;

-- Reclutas
INSERT INTO members (nickname, rank_id)
SELECT name, id
FROM (
    VALUES
    ('Abaddon'), ('Angel "Artemiza"'), ('Cerec'), ('Daniel Villalba'),
    ('Di Campino'), ('Esteban'), ('GuilletreX'), ('Hunter'),
    ('Janovich'), ('JBMatias'), ('NCU'), ('NejiiDark'),
    ('Parasyte'), ('Relan'), ('Samurai'), ('strack3322'),
    ('Tear'), ('Uriel.R'), ('ASUS'), ('Boloncho'),
    ('Facun'), ('GuardiaN'), ('Tafu'), ('TomiCheddar'),
    ('sscug')
) AS v(name)
CROSS JOIN (SELECT id FROM ranks WHERE rank_name = 'Reclutas') r;